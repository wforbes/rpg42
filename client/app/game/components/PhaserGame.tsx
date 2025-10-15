'use client';

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { GameEventBridge } from '@/lib/services/game/GameEventBridge';

// Import scenes
import { BootScene } from '../../../public/game/scenes/BootScene';
import { MainMenuScene } from '../../../public/game/scenes/MainMenuScene';
import { NewGameScene } from '../../../public/game/scenes/NewGameScene';
import { OverworldScene } from '../../../public/game/scenes/OverworldScene';


const PhaserGame = () => {
	const gameContainer = useRef<HTMLDivElement>(null);
	const gameRef = useRef<Phaser.Game | null>(null);

	useEffect(() => {
		if (gameRef.current || !gameContainer.current) {
			// If the game instance already exists or
			// 	the container is not available, do nothing.
			return;
		}

		const config: Phaser.Types.Core.GameConfig = {
			type: Phaser.AUTO,
			parent: gameContainer.current,
			width: window.innerWidth,
			height: window.innerHeight - 60, // todo: make header height config
			dom: {
				createContainer: true
			},
			pixelArt: true,
			scale: {
				mode: Phaser.Scale.RESIZE,
				autoCenter: Phaser.Scale.CENTER_BOTH,
			},
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

		const bridge = GameEventBridge.getInstance();
		bridge.initialize(gameRef.current);

		let resizeTimeout: NodeJS.Timeout;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				if (gameRef.current) {
					const width = window.innerWidth;
					const height = window.innerHeight - 60;
					gameRef.current.scale.resize(width, height);
				}
			}, 100); // Wait 100ms after resize stops
		};

		window.addEventListener('resize', handleResize);

		// Cleanup function to destroy the game instance when the component unmounts
		return () => {
			clearTimeout(resizeTimeout);
			window.removeEventListener('resize', handleResize);
			if (gameRef.current) {
				bridge.destroy();
				gameRef.current.destroy(true);
				gameRef.current = null;
			}
		};
	}, []);

	// Use the ref for the container div
	return <div ref={gameContainer} style={{ width: '100%', height: '100%', }} />;
};

export default PhaserGame;
