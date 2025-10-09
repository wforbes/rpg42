# rpg42 Rewrite - General Plan

This document outlines the high-level plan for rewriting the rpg42 project from a JavaFX application to a TypeScript-based web application.

## Phase 1: Project Scaffolding

*   `[x]` **1a. Initialize the Project**: Create a new directory for the web version of 'rpg42' and set up a TypeScript project.
*   `[x]` **1b. Select and Integrate Tools**: Use Vite as the build tool and Phaser 3 as the 2D game framework.

## Phase 2: Initial Architecture & Menu Flow

*   `[x]` **2a. Basic Phaser Setup**: Initialize a Phaser 3 game instance, configure the main game canvas, and establish the core game loop.
*   `[x]` **2b. State Management**: Implement a simple state machine to manage different game scenes, mirroring the `GameStateManager` from the original project.
*   `[x]` **2c. Main Menu Scene**: Create the main menu scene. This will include the title and buttons for "New Game," "Load Game," "Info," and "Quit."
*   `[x]` **2d. New Game Scene**: Create the "New Game" scene, which will include a text input for the player's name and a "Start Game" button.
*   `[x]` **2e. Scene Transitions**: Implement the logic to transition from the Main Menu scene to the New Game scene, and then from the New Game scene to a placeholder `Overworld` scene.

## Phase 3: Asset Migration

*   `[x]` **3a. Transfer and Organize**: Copy all assets from the original `Omnia/res` directory into the new project, organizing them into a structured format suitable for web development.

## Phase 4: Core Gameplay Loop (Top-Down)

*   `[x]` **4a. Load Overworld Assets**: In the `OverworldScene`, preload the necessary assets for the initial level, including the tileset image and the tilemap layout image.
*   `[x]` **4b. Render Static Tilemap**: Create and render the basic tilemap in the `OverworldScene` to display the ground layer of the level.
*   `[x]` **4c. Add Player Sprite**: Add the player character to the scene as a static sprite.
*   `[x]` **4d. Implement Keyboard Movement**: Add keyboard controls (e.g., WASD or arrow keys) to move the player sprite around the scene.
*   `[x]` **4e. Implement Player Animations**: Create animations from the player's 16x16 spritesheet for all 8 directions.
    *   **Animation Logic**: Each direction has 3 frames (e.g., row 0, frames 0-2 for North). The standing frame is the first frame (index 0) of each row. The walking animation for each direction must cycle between the second and third frames (index 1 and 2).
    *   **Implementation**: Create 8 distinct animations (N, S, W, E, NW, NE, SW, SE). In the update loop, play the correct animation based on input. When input stops, halt the animation and set the sprite's frame to the standing frame of the last active direction.
*   `[x]` **4f. Implement Camera Follow**: Configure the main camera to follow the player sprite as it moves.
*   `[x]` **4g. Define Collision Layer**: Add logic to define which tiles on the tilemap are solid and should block movement.

    *   **Note**: Return to topic in 4g to refine and improve the collision geometry to reduce "snagging corners" between boxes.

*   `[x]` **4h. Implement Player-World Collision**: Add a collider between the player and the solid tiles to prevent the player from moving through them.

## Phase 5: UI and Menus

*   `[ ]` **5a. Recreate and Enhance**: Recreate the pause menu and other in-game UI elements. Leverage HTML/CSS for a flexible and easily-styled UI where appropriate.

## Phase 6: Iterative Feature Implementation

*   `[ ]` **6a. Building on the Foundation**: Once a solid foundation is in place, incrementally implement other features from the original game, such as:
    *   NPCs and dialogue systems
    *   Inventory management
    *   Combat mechanics
    *   Other game modes (e.g., platformer)
