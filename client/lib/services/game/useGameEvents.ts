import { useEffect } from 'react';
import { GameEventBridge, GameEvents, GameEventPayloads } from './GameEventBridge';

export function useGameEvent<T extends GameEvents>(
	event: T,
	callback: (data: GameEventPayloads[T]) => void
) {
	useEffect(() => {
		const bridge = GameEventBridge.getInstance();

		bridge.on(event, callback);

		// Cleanup
		return () => {
			bridge.off(event, callback);
		};
	}, [event, callback]);
}

// Convenience hook to send events to game
export function useGameCommands() {
	const bridge = GameEventBridge.getInstance();

	return {
		//pauseGame: () => bridge.sendToGame(GameEvents.PAUSE_GAME, {}),
		//resumeGame: () => bridge.sendToGame(GameEvents.RESUME_GAME, {}),
		openInventory: () => bridge.sendToGame(GameEvents.TOGGLE_INVENTORY, {}),
	};
}