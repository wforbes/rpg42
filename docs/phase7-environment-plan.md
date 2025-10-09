# Phase 7 Plan: Environment Interaction & Gathering

This document details the tasks for implementing static and interactive objects in the game world, including the full gameplay loop for gathering resources from harvestable nodes.

## 7a. Static Collidable Structures

The goal is to add non-interactive environmental objects like trees, rocks, and walls that physically block the movement of the player and NPCs.

*   **7a-1. Create Structure Class**: Create a base `Structure` class in a `src/sprites` directory. It should extend `Phaser.Physics.Arcade.Image` for simplicity, as these objects won't have animations.
*   **7a-2. Create a Static Group**: In `OverworldScene`, create a `Phaser.Physics.Arcade.StaticGroup` to manage all non-moving structures. Static groups are more performant for collision detection.
*   **7a-3. Load Structure Assets**: Preload placeholder assets for a few different structures (e.g., a tree, a large rock).
*   **7a-4. Place Structures in the World**: In `OverworldScene.create()`, add several instances of the structures to the static group at various coordinates.
*   **7a-5. Add Colliders**: Add physics colliders between the `Structure` group and both the player and the NPC group to ensure they cannot pass through these objects.

## 7b. Harvestable Nodes

The goal is to create interactive objects that the player can gather resources from.

*   **7b-1. Create HarvestableNode Class**: Create a new `HarvestableNode` class that extends `Structure`. It will need additional properties like `isHarvestable: boolean`, `lootTable: object`, and `respawnTime: number`.
*   **7b-2. Create a Dynamic Group**: In `OverworldScene`, create a separate `Phaser.Physics.Arcade.Group` (not static) for harvestable nodes, as their properties will change.
*   **7b-3. Spawn a Test Node**: Place a test "plant" node on the map.
*   **7b-4. Implement Interaction Detection**: In `OverworldScene.update()`, add logic to detect player interaction. This will involve:
    *   Adding an "interact" key listener (e.g., the `E` key).
    *   When the key is pressed, check the distance between the player and any nearby nodes in the `HarvestableNode` group.
    *   If the player is close enough to a node, trigger a `startHarvest` method on that node.

## 7c. The Gathering Loop

The goal is to implement the full gameplay cycle of harvesting a node, from interaction to respawning.

*   **7c-1. Implement the Skill Timer**: When `startHarvest` is called on a node, begin a Phaser `TimerEvent`. For now, we can log a message to the console when the timer starts and finishes. We can add a visual UI element for this later.
*   **7c-2. Create a Basic Loot System**: Define a simple `lootTable` object on the test node (e.g., `{ itemId: 'herb_1', quantity: 1 }`).
*   **7c-3. Grant Loot**: When the harvest timer completes successfully, log a message indicating that the player received the loot (e.g., "Received 1x herb_1"). We will integrate this with a real inventory system in the next phase.
*   **7c-4. Implement Node "Despawning"**: After a successful harvest, the node should become inactive.
    *   Set its `isHarvestable` flag to `false`.
    *   Change its visual appearance by setting a different texture (e.g., a harvested plant sprite).
*   **7c-5. Implement Node Respawning**: After despawning, use another `TimerEvent` (`this.time.delayedCall`) to trigger a `respawn` method on the node after its `respawnTime` has passed. The `respawn` method will reset the node's texture and set `isHarvestable` back to `true`.
