import Phaser from 'phaser';
import { GameEventBridge, GameEvents } from '../../../lib/services/game/GameEventBridge';

export class OverworldScene extends Phaser.Scene {
	private playerName: string = '';
	private player!: Phaser.Physics.Arcade.Sprite;
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	private keys!: { [key: string]: Phaser.Input.Keyboard.Key };
	private eventBridge!: GameEventBridge;
	private lastDirection: string = 's'; // Default to South
	private readonly playerSpriteFrameDims: number[] = [16, 16];
	private spriteSheetWidth: number = 0;
	private escKeyHandler: (event: KeyboardEvent) => void = () => { };

	constructor() {
		super({ key: 'OverworldScene' });
	}

	init(data: { playerName: string }) {
		this.playerName = data.playerName;
	}

	preload() {
		this.load.image('tiles', 'res/overworld/tile/tiles2_1.png');
		this.load.image('mapLayout', 'res/overworld/tile/maps/test_level.gif');
		this.load.spritesheet('player', 'res/overworld/sprites/player1_pokemon_v3.gif', {
			frameWidth: this.playerSpriteFrameDims[0],
			frameHeight: this.playerSpriteFrameDims[1]
		});

		// Listen for the file load completion to get the spritesheet width
		this.load.on('filecomplete-spritesheet-player', (key: string, type: string, data: any) => {
			this.spriteSheetWidth = data.width;
		});
	}

	create() {
		// Get the event bridge instance
		this.eventBridge = GameEventBridge.getInstance();

		const playerTexture = this.textures.get('player');
		if (playerTexture) {
			this.spriteSheetWidth = playerTexture.getSourceImage()!.width;
		}

		// Emit that the scene is ready
		this.eventBridge.emit(GameEvents.GAME_READY, {});

		// Example: Emit scene change
		this.eventBridge.emit(GameEvents.SCENE_CHANGED, {
			from: 'MainMenu',
			to: 'OverworldScene'
		});

		// Listen for events from React
		/*
		this.eventBridge.on(GameEvents.PAUSE_GAME, () => {
			console.log('Pause request from React');
			this.scene.pause();
		});

		this.eventBridge.on(GameEvents.RESUME_GAME, () => {
			console.log('Resume request from React');
			this.scene.resume();
		});*/

		// Enable physics
		this.physics.world.setBounds(0, 0, 800, 600); // Set bounds for the world

		// This function creates a tilemap from the pixel data of the map layout image.
		const layer = this.createTilemapFromLayoutImage();

		// Add player sprite with physics, start with standing South frame (frame 13)
		this.player = this.physics.add.sprite(400, 300, 'player', 13);

		// Add a collider between the player and the solid tiles
		if (layer) {
			this.physics.add.collider(this.player, layer);
		}

		// Set up camera
		this.cameras.main.startFollow(this.player);
		this.cameras.main.setZoom(4);
		// Camera bounds will be set in createTilemapFromLayoutImage after the map is created

		// Create all 8-directional animations
		this.createPlayerAnimations();

		// Initialize cursor keys
		this.cursors = this.input.keyboard!.createCursorKeys();
		this.keys = {
			w: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			a: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			s: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
			d: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
			i: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.I),
			esc: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
		};

		// Create the ESC key handler as a bound function so we can remove it later
		this.escKeyHandler = (event: KeyboardEvent) => {
			if (event.code === 'Escape') {
				const isPaused = this.scene.isPaused();

				this.eventBridge.emit(GameEvents.TOGGLE_PAUSE_MENU, {});

				if (isPaused) {
					this.scene.resume();
					console.log('Game resumed via ESC');
				} else {
					this.scene.pause();
					console.log('Game paused via ESC');
				}
			}
		};

		// Add native browser event listener
		window.addEventListener('keydown', this.escKeyHandler);

		this.events.once('shutdown', () => {
			console.log('OverworldScene shutdown event fired');

			// Clean up event listener
			if (this.escKeyHandler) {
				window.removeEventListener('keydown', this.escKeyHandler);
			}

			// Clean up keyboard keys - THREE-PRONGED APPROACH
			if (this.input && this.input.keyboard) {
				// 1. Remove the Key objects from the scene's keyboard plugin
				Object.values(this.keys).forEach(key => {
					if (key) {
						this.input.keyboard!.removeKey(key);
					}
				});
		
				// Remove cursor keys
				if (this.cursors) {
					this.input.keyboard!.removeKey(this.cursors.up);
					this.input.keyboard!.removeKey(this.cursors.down);
					this.input.keyboard!.removeKey(this.cursors.left);
					this.input.keyboard!.removeKey(this.cursors.right);
				}
		
				console.log('Removed Key objects from keyboard plugin');
		
				// 2. Remove key captures from the global KeyboardManager
				// This is accessed through this.game.input.keyboard (not this.input.keyboard)
				if (this.game.input.keyboard) {
					const keyCodesToUncapture = [
						Phaser.Input.Keyboard.KeyCodes.W,
						Phaser.Input.Keyboard.KeyCodes.A,
						Phaser.Input.Keyboard.KeyCodes.S,
						Phaser.Input.Keyboard.KeyCodes.D,
						Phaser.Input.Keyboard.KeyCodes.I,
						Phaser.Input.Keyboard.KeyCodes.ESC,
						Phaser.Input.Keyboard.KeyCodes.UP,
						Phaser.Input.Keyboard.KeyCodes.DOWN,
						Phaser.Input.Keyboard.KeyCodes.LEFT,
						Phaser.Input.Keyboard.KeyCodes.RIGHT
					];
		
					this.game.input.keyboard.removeCapture(keyCodesToUncapture);
					console.log('Removed key captures from global KeyboardManager');
				}
		
				// 3. Remove all event listeners from the keyboard plugin
				this.input.keyboard.removeAllListeners();
				console.log('Removed all keyboard event listeners');
			}

			// Clean up animations
			const directions = ['n', 's', 'w', 'e', 'nw', 'ne', 'sw', 'se'];
			directions.forEach(dir => {
				const animKey = `walk-${dir}`;
				if (this.anims.exists(animKey)) {
					this.anims.remove(animKey);
				}
			});
		});

		this.events.once('destroy', () => {
			console.log('OverworldScene destroy event fired');
			// Additional cleanup if needed when scene is permanently removed
		});
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.keys.i)) {
			this.eventBridge.emit(GameEvents.TOGGLE_INVENTORY, {});
		}

		const speed = 100;
		this.player.setVelocity(0);

		const up = this.cursors.up.isDown || this.keys.w.isDown;
		const down = this.cursors.down.isDown || this.keys.s.isDown;
		const left = this.cursors.left.isDown || this.keys.a.isDown;
		const right = this.cursors.right.isDown || this.keys.d.isDown;

		let velocityX = 0;
		let velocityY = 0;
		let currentAnim: string | null = null;

		if (up) {
			velocityY = -speed;
			this.lastDirection = 'n';
			currentAnim = 'walk-n';
			if (left) {
				velocityX = -speed;
				this.lastDirection = 'nw';
				currentAnim = 'walk-nw';
			} else if (right) {
				velocityX = speed;
				this.lastDirection = 'ne';
				currentAnim = 'walk-ne';
			}
		} else if (down) {
			velocityY = speed;
			this.lastDirection = 's';
			currentAnim = 'walk-s';
			if (left) {
				velocityX = -speed;
				this.lastDirection = 'sw';
				currentAnim = 'walk-sw';
			} else if (right) {
				velocityX = speed;
				this.lastDirection = 'se';
				currentAnim = 'walk-se';
			}
		} else if (left) {
			velocityX = -speed;
			this.lastDirection = 'w';
			currentAnim = 'walk-w';
		} else if (right) {
			velocityX = speed;
			this.lastDirection = 'e';
			currentAnim = 'walk-e';
		}

		this.player.setVelocity(velocityX, velocityY);
		if (this.player.body!.velocity.x !== 0 && this.player.body!.velocity.y !== 0) {
			this.player.body!.velocity.normalize().scale(speed);
		}

		if (currentAnim) {
			this.player.anims.play(currentAnim, true);
		} else {
			this.player.anims.stop();
			// Set to standing frame based on last direction
			const stride = this.spriteSheetWidth / this.playerSpriteFrameDims[0];
			const standingFrames: { [key: string]: number } = { n: 0, s: stride, w: stride * 2, e: stride * 3, nw: stride * 4, ne: stride * 5, sw: stride * 6, se: stride * 7 };
			this.player.setFrame(standingFrames[this.lastDirection]);
		}
	}

	createPlayerAnimations() {
		// Each row is a direction, with a calculated stride.
		// Frame 0 is standing, Frames 1 & 2 are walking.
		const stride = this.spriteSheetWidth / this.playerSpriteFrameDims[0];
		if (stride === 0) {
			console.error("Sprite sheet width not loaded, cannot create animations.");
			return;
		}

		const directions = { n: 0, s: 1, w: 2, e: 3, nw: 4, ne: 5, sw: 6, se: 7 };
		for (const [dir, rowIndex] of Object.entries(directions)) {
			const startFrame = rowIndex * stride;
			this.anims.create({
				key: `walk-${dir}`,
				frames: [
					{ key: 'player', frame: startFrame + 1 },
					{ key: 'player', frame: startFrame + 2 }
				],
				frameRate: 5,
				repeat: -1,
				yoyo: true // Cycle back and forth between the two walking frames
			});
		}
	}

	createTilemapFromLayoutImage(): Phaser.Tilemaps.TilemapLayer | null {
		const mapLayout = this.textures.get('mapLayout').getSourceImage();
		if (!(mapLayout instanceof HTMLImageElement)) {
			console.error('Map layout is not a valid image element.');
			return null;
		}
		const mapWidth = mapLayout.width;
		const mapHeight = mapLayout.height;

		// Create a 2D array to hold our tilemap data
		const mapData: number[][] = Array.from({ length: mapHeight }, () => new Array(mapWidth).fill(0));

		// Create a temporary canvas to read pixel data
		const canvas = this.textures.createCanvas('tempMap', mapWidth, mapHeight);
		if (!canvas) return null;

		// Get the context and disable image smoothing BEFORE drawing
		const context = canvas.getContext();
		if (!context) return null;
		context.imageSmoothingEnabled = false;

		// Now, draw the layout image onto the canvas
		canvas.draw(0, 0, mapLayout);

		// Define the mapping from hex color to tile index and collision.
		const colorMap: { [key: string]: { index: number; collides: boolean } } = {
			'#00ff00': { index: 0, collides: false },  // Green -> Grass
			'#555555': { index: 1, collides: true },   // Gray -> Building (assuming tile index 3)
			'#0000ff': { index: 0, collides: false }   // Blue -> Water (treated as Grass for now)
		};

		// Iterate over each pixel of the layout image
		for (let y = 0; y < mapHeight; y++) {
			for (let x = 0; x < mapWidth; x++) {
				const pixel = context.getImageData(x, y, 1, 1).data;
				const hexColor = Phaser.Display.Color.RGBToString(pixel[0], pixel[1], pixel[2], 255, '#');
				const tileInfo = colorMap[hexColor] || { index: 0, collides: false };
				mapData[y][x] = tileInfo.index;
			}
		}

		// Create the tilemap
		const map = this.make.tilemap({ data: mapData, tileWidth: 32, tileHeight: 32 });
		const tileset = map.addTilesetImage('tiles', 'tiles', 32, 32);
		if (tileset) {
			const layer = map.createLayer(0, tileset, 0, 0);
			if (layer) {
				// Define which tiles in the tileset are collidable.
				// In our case, the rock tile is at index 1.
				layer.setCollision([1]);

				// Set camera bounds after layer is created
				this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
				// Clean up the temporary canvas
				this.textures.remove('tempMap');
				return layer;
			}
		}

		// Clean up the temporary canvas in case of failure
		this.textures.remove('tempMap');
		return null;
	}

	/* Hallunciated as a method to shutdown the scene, but not actually called.
	shutdown() {
		console.log('Shutting down OverworldScene');
		// clean up event listener(s)
		if (this.escKeyHandler) {
			window.removeEventListener('keydown', this.escKeyHandler);
		}

		// Clean up keyboard key captures
		// This allows these keys to work in text inputs again
		if (this.input && this.input.keyboard) {
			// Remove key captures so they don't interfere with text inputs in other scenes
			const keyCodes = [
				Phaser.Input.Keyboard.KeyCodes.W,
				Phaser.Input.Keyboard.KeyCodes.A,
				Phaser.Input.Keyboard.KeyCodes.S,
				Phaser.Input.Keyboard.KeyCodes.D,
				Phaser.Input.Keyboard.KeyCodes.I,
				Phaser.Input.Keyboard.KeyCodes.ESC
			];

			keyCodes.forEach(keyCode => {
				// Remove the key from the keyboard plugin
				if (this.input.keyboard) {
					this.input.keyboard.removeKey(keyCode);
				}
			});

			console.log('Removed keyboard key captures');
		}

		// clean up animations
		const directions = ['n', 's', 'w', 'e', 'nw', 'ne', 'sw', 'se'];
		directions.forEach(dir => {
			const animKey = `walk-${dir}`;
			if (this.anims.exists(animKey)) {
				this.anims.remove(animKey);
			}
		});
	}*/
}
