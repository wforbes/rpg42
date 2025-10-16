import Phaser from 'phaser';

export enum GameEvents {
	// React → Phaser
	TOGGLE_INVENTORY = 'ui:toggleInventory',
	TOGGLE_PAUSE_MENU = 'ui:togglePauseMenu',
	
	// Phaser → React
	PLAYER_DIED = 'player:died',
	PLAYER_LEVEL_UP = 'player:levelUp',
	INVENTORY_CHANGED = 'inventory:changed',
	SCENE_CHANGED = 'scene:changed',
	GAME_READY = 'game:ready',
}

// Event payload types
export interface GameEventPayloads {
	[GameEvents.TOGGLE_INVENTORY]: {};
	[GameEvents.TOGGLE_PAUSE_MENU]: {};
	[GameEvents.PLAYER_DIED]: { position: { x: number; y: number } };
	[GameEvents.PLAYER_LEVEL_UP]: { level: number; stats: any };
	[GameEvents.INVENTORY_CHANGED]: { items: any[] };
	[GameEvents.SCENE_CHANGED]: { from: string; to: string };
	[GameEvents.GAME_READY]: {};
}

export class GameEventBridge {
	private static instance: GameEventBridge;
	private game: Phaser.Game | null = null;
	private eventEmitter: Phaser.Events.EventEmitter | null = null;

	private constructor() { }

	static getInstance(): GameEventBridge {
		if (!GameEventBridge.instance) {
			GameEventBridge.instance = new GameEventBridge();
		}
		return GameEventBridge.instance;
	}

	// Call this from PhaserGame component after game is created
	initialize(game: Phaser.Game) {
		this.game = game;
		// Use the game's event emitter
		this.eventEmitter = game.events;
		console.log('GameEventBridge initialized');
	}

	// Emit event from Phaser to React
	emit<T extends GameEvents>(event: T, data?: GameEventPayloads[T]) {
		if (this.eventEmitter) {
			this.eventEmitter.emit(event, data);
		} else {
			console.warn('GameEventBridge not initialized');
		}
	}

	// Listen to events in React
	on<T extends GameEvents>(
		event: T,
		callback: (data: GameEventPayloads[T]) => void
	) {
		if (this.eventEmitter) {
			this.eventEmitter.on(event, callback);
		} else {
			console.warn('GameEventBridge not initialized');
		}
	}

	// Remove listener
	off<T extends GameEvents>(
		event: T,
		callback: (data: GameEventPayloads[T]) => void
	) {
		if (this.eventEmitter) {
			this.eventEmitter.off(event, callback);
		}
	}

	// Emit event from React to Phaser
	sendToGame<T extends GameEvents>(event: T, data?: GameEventPayloads[T]) {
		this.emit(event, data);
	}

	getGame(): Phaser.Game | null {
		return this.game;
	}

	destroy() {
		this.game = null;
		this.eventEmitter = null;
	}
}