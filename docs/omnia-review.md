# Omnia Project Review

This document serves as a detailed analysis of the original Omnia project's source code. The goal is to understand the architecture, feature implementation, and overall program flow to guide the TypeScript rewrite into 'rpg42'.

The review will proceed by following the order of program execution, starting with the main entry point and progressing through different game states and features.

## Initial Execution Analysis: `game` and `menu` packages

This section will focus on the core classes that handle the game's startup, main loop, and state management.

### `Game.java` - The Application Entry Point

The `net.wforbes.omnia.game.Game` class serves as the main entry point for the Omnia application.

*   **Framework**: It extends `javafx.application.Application`, the standard base class for all JavaFX applications.
*   **Startup**: The `main` method calls the `launch()` method, which initializes the JavaFX toolkit and calls the `start()` method.
*   **UI Loading**: The `start()` method is responsible for setting up the primary window (Stage). It loads the initial user interface from an FXML file located at `/fxml/MainView.fxml`. This FXML file defines the layout and components of the main game window.
*   **Styling**: Multiple CSS files are loaded and applied to the scene in the `initStyles()` method. This indicates that the UI for different game menus and components (main menu, chatbox, pause menu, etc.) is styled using external stylesheets.
*   **Input Handling**: The class initializes a `KeyPolling` singleton, which is responsible for capturing and managing all keyboard input for the game. This suggests a centralized input handling system.
*   **Configuration**: Static variables for `WIDTH`, `HEIGHT`, and `SCALE` are defined, which determine the initial resolution and scale of the game window.

This class orchestrates the initial setup, but the actual game logic and UI are delegated to the FXML file and its associated controller. The next logical step is to examine `/fxml/MainView.fxml` and its controller, `GameController`.

### `GameController.java` - The Core Orchestrator

The `GameController` is the central class that connects the FXML view to the game's logic and manages the main game loop.

*   **Initialization**: The `initialize()` method, called on startup, is responsible for instantiating the core components:
    *   **`GameStateManager (gsm)`**: This is the most important component. It's a state machine that manages the different states of the game (e.g., Main Menu, Overworld).
    *   **`Renderer`**: This class handles all drawing operations on the `gameCanvas`.
    *   **`GameLoopTimer`**: This is the main game loop, which has two primary functions:
        *   `render()`: Called every frame to draw the current game state via `gsm.render()`.
        *   `tick()`: Called at a fixed rate to update the game logic of the current state via `gsm.update()`.

*   **Input Delegation**: The controller captures keyboard and mouse events. However, it doesn't process them directly. Instead, it delegates the events to the *current active game state* by calling methods on `gsm.getCurrentState()`. This is a clean, state-based approach to input handling.

*   **State Machine Architecture**: This class confirms that the game is built on a state machine pattern. The `GameController` sets up the engine, but the `GameStateManager` is responsible for controlling what the player is currently doing, whether it's navigating a menu or playing in the game world.

The `GameController` acts as the engine's core, but the `GameStateManager` is the brain. Our next step must be to analyze the `GameStateManager` and the various `GameState` implementations it controls.

### `GameStateManager.java` - The State Machine

This class is the central hub for managing and transitioning between all the different parts of the game.

*   **State Storage**: It holds an `ArrayList` of all possible `GameState` objects (`MenuState`, `TopDownState`, `PlatformerState`, `OverworldState`).
*   **Initial State**: Upon creation, it sets the initial state to `MENUSTATE`, ensuring the game always starts at the main menu.
*   **State Transitions**: The `setState()` method is the core of the state machine. It switches the current state, clears keyboard input to prevent conflicts, and calls the `init()` method on the new state to allow it to perform setup tasks.
*   **Logic and Render Delegation**: The manager's `update()` and `render()` methods delegate all logic and rendering calls to the currently active `GameState` object. This is a clean and effective way to ensure only the relevant part of the game is running at any given time.
*   **Player Data Handling**: A specific method, `initializePlayerData`, exists to pass the player's name from the menu state to the `OverworldState`.

The `GameStateManager` provides a clear and robust implementation of the state pattern. To understand how the game begins, we must now examine the initial state it loads: `MenuState`.

### `MenuState.java` - The Menu Container

The `MenuState` class serves as a simple wrapper that connects the `GameStateManager` to the actual main menu implementation.

*   **Composition**: Rather than containing the menu logic itself, `MenuState` creates an instance of `net.wforbes.omnia.menu.mainMenu.MainMenu`.
*   **Delegation**: It delegates all of its core `GameState` responsibilities (`init()`, `update()`, `render()`) directly to the `MainMenu` object.
*   **Decoupling**: This design effectively decouples the state management logic from the menu's UI and interaction logic. The `GameStateManager` only needs to know about `MenuState`, while the complex details of the menu are encapsulated within the `MainMenu` class.

To understand how the menu is built and how it triggers the start of the game, we must now investigate the `MainMenu` class.

### `MainMenu.java` - UI Construction and Event Handling

This class is responsible for programmatically building and managing the main menu's user interface.

*   **UI Construction**: The UI is built entirely in code, without using FXML. The `init()` method orchestrates the creation of JavaFX `VBox` layouts, which are then populated with `Button` and `Text` controls.
*   **UI Placement**: The constructed UI elements are added to the `gameBorder` pane (from `MainView.fxml`), with the main navigation on the left and developer shortcuts on the right. This confirms that the menu is an overlay on top of the game canvas.
*   **Background Rendering**: The class manages and renders an animated `MenuBackground` directly onto the game canvas, which appears behind the UI elements in the `gameBorder` pane.
*   **Event Handling**: Each button has a `MOUSE_CLICKED` event handler:
    *   The **(dev) Overworld** button provides a crucial shortcut, directly calling `gsm.setState(OVERWORLDSTATE)` to bypass the menu and jump straight into the game.
    *   The **New Game** button calls `showNewGamePage()`, which transitions the UI to a character creation screen.
*   **New Game Flow**: The `showNewGamePage()` method clears the main menu buttons and displays a new UI, managed by the `NewGamePage` class, in the center of the screen.

The `MainMenu` class demonstrates a clear separation between the main menu and the new game screen. The final step in understanding the game's startup sequence is to analyze `NewGamePage.java`.

### `NewGamePage.java` - Player Creation and Game Start

This class provides the simple UI for starting a new game and is the final step in the application's startup sequence.

*   **UI**: It constructs a `GridPane` that serves as a modal window. This UI contains a text field for the player's name and a "Start Game" button.
*   **Game Start Logic**: The "Start Game" button's event handler executes the final steps to begin gameplay:
    1.  It clears the menu UI from the screen.
    2.  It captures the player's name from the text field and passes it to the `GameStateManager` via `initializePlayerData()`.
    3.  It instructs the `GameStateManager` to switch to the `OVERWORLDSTATE`.

This concludes the analysis of the game's startup flow. We have traced the execution from the initial `Game.java` entry point, through the menu system, to the point where the `OverworldState` is activated and the main game begins.

## Overworld Implementation

This section details how the core top-down gameplay mechanics, such as level rendering and player control, are implemented.

### `OverworldState`, `World`, and `Area` classes

The architecture for the overworld is layered:
*   `OverworldState.java`: The main state class, which holds a `World` object.
*   `World.java`: Manages the concept of different game areas and holds the `currentArea`.
*   `Area.java`: Represents a single map or level. This is the class that contains the core logic for rendering the game world.

All `update` and `render` calls are passed down this chain from the `GameStateManager`.

### Tilemap Loading and Rendering (Tasks 4a & 4b)

The logic for loading assets and rendering the tilemap is found in `Area.java` and its `TileMap` object.

*   **Asset Loading (`4a`):** The `Area.initTileMap()` method contains the specific file paths for the initial level:
    *   **Map Layout:** `/overworld/tile/maps/areamap0.gif` is loaded. This image acts as a blueprint for the level, where each pixel's color corresponds to a specific tile type.
    *   **Tileset:** `/overworld/tile/tiles2.gif` is loaded. This image contains the actual tile graphics (grass, dirt, water, etc.).

*   **Tilemap Rendering (`4b`):**
    *   An instance of `TileMap` is created with a tile size of 32x32 pixels.
    *   The `loadTilesFromMapImage()` method is called, which processes the map layout image to build the level data.
    *   The `Area`'s `render()` method calls `tileMap.render()`, which is responsible for drawing the visible portion of the tilemap to the screen each frame.

This review confirms the classic technique of using an image as a level editor and a separate spritesheet as a tileset to construct the game world.

### Player Implementation (Tasks 4c, 4d, 4e)

The core player logic is encapsulated within `net.wforbes.omnia.overworld.entity.mob.player.Player.java`.

*   **Player Sprite (`4c`):**
    *   **Sprite Sheet:** The `Player.init()` method loads the sprite sheet from `/overworld/sprites/player1_pokemon_v3.gif`.
    *   **Sprite Size:** The player's width and height are set to `16`, indicating that the sprite sheet is a grid of 16x16 pixel frames.

*   **Keyboard Movement (`4d`):**
    *   The `Player.checkMovement()` method handles all movement logic.
    *   It polls for WASD and arrow key presses on each update tick using the `keyboardController`.
    *   Based on the input, it calculates a movement vector and calls a `move()` method to update the player's coordinates.

*   **Player Animation (`4e`):**
    *   The `Player.init()` method defines the number of animation frames for each of the 8 movement directions.
    *   It uses a dedicated helper class, `MovementAnimation`, to manage the logic for which frame to display and when to advance to the next frame.
    *   The player's `update()` method calls `movementAnimation.update()` on each tick to keep the animation running.
    *   The `move()` method is responsible for setting the player's current direction, which the `MovementAnimation` class uses to select the correct row of frames from the sprite sheet.
    *   **Sprite Sheet Layout:** The `Mob.loadSprites()` method reveals the sprite sheet's structure. The animations are stored in rows, with each row corresponding to a direction constant:
        *   `FACING_N = 0`: Row 0 contains the **Up** animation frames.
        *   `FACING_S = 1`: Row 1 contains the **Down** animation frames.
        *   `FACING_W = 2`: Row 2 contains the **Left** animation frames.
        *   `FACING_E = 3`: Row 3 contains the **Right** animation frames.
        The standing frame for each direction is the middle frame (frame 1) of that row.

---

## Further Feature Review (Based on README)

The following sections outline other major features that were completed in the original Omnia project, categorized into logical phases for the rewrite.

### Phase 5: NPCs and Core Interactions

This phase covers the implementation of non-player characters and the foundational systems for player interaction with them and the world.

*   **NPC Implementation**:
    *   Logic for NPCs as a distinct `Mob` type.
    *   Rendering NPCs on the screen with their name displayed above them.
*   **Movement & AI**:
    *   Basic automated movement (pacing).
    *   Collision detection with the world and other mobs, including reaction logic (e.g., reversing path).
    *   A simple pathfinding system was implemented for "click-to-move" functionality and for NPCs to follow the player.
*   **Dialogue System**:
    *   A GUI chat window for displaying dialogue.
    *   NPCs stop moving when engaged in dialogue.
    *   The ability to have clickable links within the dialogue text for responses.

### Phase 6: Core UI/GUI Systems

This phase focuses on the user interface elements that support gameplay.

*   **Window Management**:
    *   A GUI system for creating distinct windows (Chat, Developer Info).
    *   Windows could be resized and were styled using CSS.
*   **Player Controls & Menus**:
    *   A pause feature and an associated pause menu.
    *   A "run" mechanic (holding SHIFT) to increase player movement and animation speed.
    *   Quick-key focus for the chat window (e.g., pressing Enter to start typing).

### Phase 7: Environment Interaction & Gathering

This phase details how the player interacts with objects in the game world.

*   **Collidable Structures**:
    *   Addition of static environment objects and building structures that mobs would collide with.
*   **Harvestable Nodes**:
    *   Interactable nodes (e.g., plants) that could be harvested.
    *   A complete gathering loop:
        *   **Skill Timers**: A progress bar/timer appeared during the gathering action.
        *   **Loot System**: Nodes had loot tables to determine what items were gathered.
        *   **Lifecycle**: Nodes would "despawn" after being harvested and "respawn" after a set timer.
        *   **Persistence**: The system saved node loot and player progress between interactions.

### Phase 8: Inventory and Items

This phase covers the initial implementation of a player inventory.

*   **Item System**: A basic structure for defining items in the game.
*   **Inventory GUI**: A simple "Bag" window with item slots to show what the player is carrying.
*   **Loot Integration**: The gathering system was connected to the inventory to transfer items to the player.

### Phase 9: Combat Mechanics

This phase outlines the foundational systems for combat between the player and enemies.

*   **Enemy AI**:
    *   A prototype enemy was created.
    *   Basic "aggro" logic where an enemy would pursue the player upon entering a certain range.
*   **Melee Combat**:
    *   A health and damage system for both players and enemies.
    *   Basic attack animations.
    *   The ability for both the player and enemies to deal damage to each other.
    *   Logic for enemy death when HP reaches zero.
*   **Combat UI**:
    *   Floating combat numbers to show damage dealt.
    *   A GUI element to display a mob's health bar above its sprite.
*   **Projectile System**:
    *   A basic system for the player to fire a projectile in their facing direction.
