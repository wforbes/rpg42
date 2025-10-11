'use client';

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

// Import scenes
import { BootScene } from '../../../public/game/scenes/BootScene';
import { MainMenuScene } from '../../../public/game/scenes/MainMenuScene';
import { NewGameScene } from '../../../public/game/scenes/NewGameScene';
import { OverworldScene } from '../../../public/game/scenes/OverworldScene';


const PhaserGame = () => {
  const gameContainer = useRef<HTMLDivElement>(null);
  // Use a ref to store the game instance
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current || !gameContainer.current) {
        // If the game instance already exists or the container is not available, do nothing.
        return;
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: gameContainer.current, // Attach to the ref'd div
      width: '100%', // Fixed width
      height: '100%', // Fixed height
	  dom: {
		createContainer: true
	  },
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: true,
        },
      },
      scene: [BootScene, MainMenuScene, NewGameScene, OverworldScene],
    };

    // Create the game instance and store it in the ref
    gameRef.current = new Phaser.Game(config);

    // Cleanup function to destroy the game instance when the component unmounts
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  // Use the ref for the container div
  return <div ref={gameContainer} style={{ width: '100%', height: '100%', }} />;
};

export default PhaserGame;
