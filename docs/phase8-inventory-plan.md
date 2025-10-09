# Phase 8 Plan: Inventory and Items

This document outlines the tasks for creating a foundational inventory system. This includes defining what an item is, giving the player a place to store items, creating a UI to view them, and connecting this system to the gathering loop.

## 8a. Item System Foundation

The goal is to establish a clear data structure for items that can be used throughout the game.

*   **8a-1. Create Item Data Structure**: Create a new file for a base `Item` class or interface in a `src/data` directory. It should define the core properties of all items, such as `itemId: string`, `name: string`, `description: string`, and `texture: string` (for the icon).
*   **8a-2. Create an Item Registry**: Create a simple, globally accessible registry (e.g., a TypeScript `Map` object) to act as the game's item database. This will be keyed by `itemId` and will store the template for each item.
*   **8a-3. Populate with Test Items**: Populate the registry with a few test items, including the "herb_1" we planned for in the gathering phase, ensuring each has a unique `itemId` and associated data.

## 8b. Player Inventory

The goal is to create a component that manages the items a player currently possesses.

*   **8b-1. Create Inventory Class**: Create a `PlayerInventory` class. This class will manage the collection of items. The core of this will be a data structure (e.g., a `Map`) to store the `itemId` and the current `quantity`.
*   **8b-2. Implement Core Methods**: The `PlayerInventory` class should have essential methods like `addItem(itemId, quantity)`, `removeItem(itemId, quantity)`, and `hasItem(itemId)`.
*   **8b-3. Attach Inventory to a Global State**: Instead of attaching the inventory just to the `OverworldScene`, we should establish a simple global state object or a Phaser Registry to hold the player's inventory. This will allow the inventory to persist between scenes.

## 8c. Inventory UI (The "Bag")

The goal is to create a visual representation of the player's inventory that they can open and close.

*   **8c-1. Create Inventory Scene**: Create a new `InventoryScene.ts` file. This scene will be launched as an overlay, similar to the `PauseMenuScene`.
*   **8c-2. Add Input Listener**: In `OverworldScene`, add a listener for an inventory key (e.g., `I` or `B`) to toggle the `InventoryScene`. When the inventory is opened, the `OverworldScene` should be paused. When it's closed, the scene should resume.
*   **8c-3. Design UI Layout**: In `InventoryScene`, create the visual layout. This will be a background image representing the bag and a grid of "slots" where items can be displayed.
*   **8c-4. Render Items**: When the `InventoryScene` opens, it will read the data from the global player inventory. It will then iterate through the items and render the appropriate icon and stack size (`quantity`) in the UI slots.

## 8d. Loot Integration

The goal is to connect the gathering system so that successfully harvested items are added to the player's new inventory.

*   **8d-1. Modify Grant Loot Logic**: Revisit the `HarvestableNode` logic from the previous phase.
*   **8d-2. Connect to Inventory**: When a harvest is successful, instead of just logging a message, the code will now access the global `PlayerInventory` instance and call its `addItem()` method with the `itemId` and `quantity` from the node's `lootTable`.
*   **8d-3. Optional UI Feedback**: For a better user experience, we can use the global event emitter (from the UI plan) to fire an `item-looted` event. A listener in the main `OverworldScene` can then display a temporary text pop-up (e.g., "+1 Herb").
