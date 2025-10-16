import { useGameCommands } from "@/lib/services/game/useGameEvents";
import { GameEventBridge, GameEvents } from "@/lib/services/game/GameEventBridge";

export const PauseMenu = () => {
	const bridge = GameEventBridge.getInstance();
	const game = bridge.getGame();

	const handleResume = () => {
		// Send event to toggle pause menu
		bridge.emit(GameEvents.TOGGLE_PAUSE_MENU, {});

		// Resume the scene
		const activeScene = game?.scene.getScene('OverworldScene');
		if (activeScene) {
			game?.scene.resume('OverworldScene');
		}
	};

	const handleReturnToMainMenu = () => {
		// Resume first to avoid stuck state
		const activeScene = game?.scene.getScene('OverworldScene');
		if (activeScene && activeScene.scene.isPaused()) {
			game?.scene.resume('OverworldScene');
		}

		// Stop the scene (this should trigger shutdown)
		console.log('Stopping OverworldScene...');
		game?.scene.stop('OverworldScene');

		// Then remove it completely
		console.log('Removing OverworldScene...');
		game?.scene.remove('OverworldScene');

		// start main menu scene
		game?.scene.start('MainMenuScene');

		// emit scene changed event
		bridge.emit(GameEvents.SCENE_CHANGED, {
			from: 'OverworldScene',
			to: 'MainMenu'
		});
		// close pause menu
		bridge.emit(GameEvents.TOGGLE_PAUSE_MENU, {});
	};

	const handleQuitGame = () => {
		// In a web game, you might redirect or show a confirmation
		if (confirm('Are you sure you want to quit?')) {
			window.location.href = '/';
		}
	};

	return (
		<div className="absolute top-0 left-0 w-full h-full z-50 pointer-events-auto flex items-center justify-center">
			{/* Semi-transparent overlay */}
			<div className="absolute top-0 left-0 w-full h-full bg-black/50" onClick={handleResume}></div>

			{/* Menu container */}
			<div className="relative z-10 bg-gray-800 border-2 border-gray-600 rounded-lg p-8 min-w-[300px]">
				<h2 className="text-2xl font-bold text-white text-center mb-6">Paused</h2>
				<div className="flex flex-col gap-3">
					<button
						onClick={handleResume}
						className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
					>
						Resume
					</button>
					<button
						onClick={handleReturnToMainMenu}
						className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
					>
						Return to Main Menu
					</button>
					<button
						onClick={handleQuitGame}
						className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
					>
						Quit Game
					</button>
				</div>
			</div>
		</div>
	);
};