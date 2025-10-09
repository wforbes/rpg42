# Phase 9 Plan: Combat Mechanics

This document outlines the tasks for implementing a foundational combat system. It covers the creation of enemies, player and enemy attack actions, a health and damage system, and the necessary UI feedback.

## 9a. Base Enemy & Combat AI

The goal is to create a distinct enemy entity that can pursue the player.

*   **9a-1. Create Enemy Class**: In the `src/sprites` directory, create an `Enemy` class that extends `Phaser.Physics.Arcade.Sprite`. It should include combat-related properties like `health`, `maxHealth`, and `damage`.
*   **9a-2. Spawn a Test Enemy**: In `OverworldScene.create()`, instantiate and add a test enemy to a new `enemies` group (`this.physics.add.group()`).
*   **9a-3. Implement Aggro System**: In the `Enemy` class's `update()` method, constantly check the distance to the player. If the distance is within a defined `aggroRadius`, the enemy should enter a "pursuing" state.
*   **9a-4. Implement Pursuit AI**: When in the "pursuing" state, use `this.physics.moveToObject(this, player, speed)` to have the enemy automatically move toward the player. If the player is outside the `aggroRadius`, the enemy should stop moving.
*   **9a-5. Add Enemy Colliders**: In `OverworldScene`, add colliders between the `enemies` group and the world, the player, and itself to ensure proper physical interaction.

## 9b. Player & Enemy Attacks

The goal is to enable both the player and enemies to perform basic attacks.

*   **9b-1. Player Melee Attack**: In `OverworldScene`, add a listener for an attack key (e.g., `SPACE`). When pressed, play an attack animation and create a small, temporary, invisible "hitbox" sprite in front of the player based on their last direction.
*   **9b-2. Melee Hit Detection**: Use `this.physics.add.overlap()` to detect when the player's hitbox overlaps with an enemy. The overlap callback will call a `takeDamage` method on the enemy and then destroy the hitbox.
*   **9b-3. Enemy Melee Attack**: In the `Enemy`'s `update` method, if it is close enough to the player, use a timer (`Phaser.Time.TimerEvent`) to perform an attack every few seconds. The attack will call a `takeDamage` method on the player.
*   **9b-4. Player Projectile Attack**: Add another listener (e.g., `F` key). When pressed, create a `Projectile` sprite, add it to a `projectiles` group, and set its velocity in the player's last known direction.
*   **9b-5. Projectile Hit Detection**: Add an overlap handler between the `projectiles` group and the `enemies` group. On overlap, the projectile should be destroyed, and the enemy should take damage.

## 9c. Health, Damage, & Death

The goal is to create the core system for tracking health and handling character death.

*   **9c-1. Add `takeDamage` Method**: Add a `takeDamage(amount)` method to a common base class or to both the Player and Enemy classes. This method will decrease `health` and can trigger other effects.
*   **9c-2. Add Player Health**: Give the player character `health` and `maxHealth` properties.
*   **9c-3. Implement Death Logic**: In the `takeDamage` method, after health is reduced, check if `health <= 0`. If it is, call a `die()` method.
*   **9c-4. Enemy Death**: The `die()` method for an enemy should disable its physics body, play a death animation, and finally `destroy()` the game object.
*   **9c-5. Player Death**: For now, the player's `die()` method can pause the game and display a "Game Over" message using a new, simple UI scene.

## 9d. Combat UI Feedback

The goal is to provide clear visual feedback to the player during combat.

*   **9d-1. Create Mob Health Bars**: Create a simple `HealthBar` class. An instance of this will be attached to each enemy and the player. It can consist of two `Phaser.GameObjects.Rectangle` objects (a background and a foreground bar).
*   **9d-2. Update Health Bars**: In the `update()` loop of each mob, the health bar's position should be updated to follow the mob, and the width of the foreground bar should be set based on the current `health / maxHealth` ratio.
*   **9d-3. Implement Floating Damage Numbers**: Create a function that generates a `Phaser.GameObjects.Text` object at a given position to display a damage amount.
*   **9d-4. Animate Damage Numbers**: When the `takeDamage` method is called, it will also call this function. Use a Phaser `Tween` to make the text object float upwards and fade out before it is destroyed.
