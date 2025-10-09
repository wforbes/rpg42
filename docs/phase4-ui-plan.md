# Phase 4 Plan: Core UI/GUI Systems

This document outlines the tasks for implementing core user interface and interaction systems, including menus, player actions, and the dialogue system. We will leverage Phaser Scenes for overlay menus and HTML DOM elements for flexible, CSS-styled UI components.

## 4a. Pause Menu

The goal is to allow the player to pause the game and open a menu with options to resume or quit.

*   **4a-1. Create Pause Scene**: Create a new file for a `PauseMenuScene` class. This scene will be launched *on top* of the `OverworldScene`.
*   **4a-2. Input Listener**: In `OverworldScene`, add a listener for the `ESC` key. When pressed, it should pause the `OverworldScene` and launch the `PauseMenuScene`.
*   **4a-3. Create Menu UI**: In `PauseMenuScene`, create UI text or buttons for "Resume" and "Return to Main Menu".
*   **4a-4. Implement "Resume"**: The "Resume" button should stop the `PauseMenuScene` and resume the `OverworldScene`.
*   **4a-5. Implement "Return to Main Menu"**: This button should stop both the `PauseMenuScene` and the `OverworldScene`, then start the `MainMenuScene`.

## 4b. Player "Run" Mechanic

The goal is to enable the player to move faster by holding a key.

*   **4b-1. Add Speed States**: In `OverworldScene`, define two speed constants: `walkSpeed` and `runSpeed`.
*   **4b-2. Add Input Listener**: Add a listener for the `SHIFT` key.
*   **4b-3. Modify Movement Logic**: In the `update()` loop, check if the `SHIFT` key is held down. If it is, use `runSpeed` for the player's velocity; otherwise, use `walkSpeed`.
*   **4b-4. Adjust Animation Speed**: When running, increase the `frameRate` of the player's walking animations to match the faster movement. This can be done by dynamically setting `player.anims.msPerFrame`.

## 4c. Dialogue & Chat UI System

The goal is to create a flexible chat window for displaying NPC dialogue and allowing player interaction, using HTML DOM elements for easy styling.

*   **4c-1. Create UI Container**: In `OverworldScene.create()`, use `this.add.dom()` to create a container `div` for the chat UI and position it on the screen using CSS.
*   **4c-2. Create a Global Event Emitter**: To facilitate communication between game objects (like NPCs) and the UI, create a global event emitter (`new Phaser.Events.EventEmitter()`) accessible throughout the scene.
*   **4c-3. Display Dialogue on Event**: The `OverworldScene` will listen for a `show-dialogue` event on the emitter. When this event is fired, it will update the inner HTML of the chat UI container with the dialogue text.
*   **4c-4. Trigger Dialogue from NPC**: We will need a way to interact with NPCs. For now, we can add a temporary keyboard key. When the player is close to an NPC and presses the key, the NPC will emit the `show-dialogue` event with its text.
*   **4c-5. Pause NPC on Dialogue**: When an NPC emits a `show-dialogue` event, it should set an internal flag (e.g., `isTalking = true`). In its `update()` method, if this flag is true, it should halt its movement.
*   **4c-6. Implement Clickable Links**: The dialogue text passed in the event can be an HTML string. This allows for including `<a href="#" data-response="choice1">...</a>` tags. The UI code can add click listeners to these links, which will then fire new events back to the game (e.g., `dialogue-response` with the `data-response` value).
