# Phase 3 Plan: NPCs and Core Interactions

This document outlines the sequential tasks required to implement Non-Player Characters (NPCs) and their core movement and interaction behaviors in the `rpg42` project.

## 3a. Base NPC Implementation

The goal of this step is to create the fundamental NPC object and get it rendering in the world.

*   **3a-1. Create NPC Class**: Create a new `NPC` class in a `src/sprites` directory. This class should extend `Phaser.Physics.Arcade.Sprite` to leverage the built-in physics system.
*   **3a-2. Add Basic Properties**: The `NPC` class should have basic properties such as `name`, `health`, and any other initial data required.
*   **3a-3. Create NPC Manager**: In the `OverworldScene`, create a simple manager (e.g., a `Phaser.GameObjects.Group`) to hold all NPC instances.
*   **3a-4. Spawn a Test NPC**: In the `create()` method of the `OverworldScene`, instantiate a test NPC using a placeholder sprite and add it to the scene.
*   **3a-5. Render NPC Name**: Create a `Phaser.GameObjects.Text` object for the NPC's name. In the `update()` loop, ensure the name's position is updated to follow the NPC sprite, appearing slightly above it.

## 3b. Movement, AI, and Collision

The goal of this step is to bring the NPC to life with simple movement and make it interact physically with the world.

*   **3b-1. Implement Pacing AI**: Add a simple "pacing" behavior to the `NPC` class. This could be defined by a start and end coordinate, with the NPC moving back and forth between them.
*   **3b-2. NPC-World Collision**: In `OverworldScene`, add a collider between the NPC group and the world's solid tilemap layer to prevent them from walking through walls.
*   **3b-3. NPC-Player Collision**: Add a collider between the NPC group and the player sprite to prevent them from walking through each other.
*   **3b-4. NPC-NPC Collision**: Add a collider between the NPC group and itself so that multiple NPCs will not overlap.
*   **3b-5. Implement Collision Reaction**: Modify the pacing logic. When an NPC collides with a solid object (wall, player, another NPC) while moving, it should immediately reverse its direction.
