import Phaser from 'phaser';

export class OverworldScene extends Phaser.Scene {
	private playerName: string = '';
	private player!: Phaser.Physics.Arcade.Sprite;
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	private keys!: { [key: string]: Phaser.Input.Keyboard.Key };
	private lastDirection: string = 's'; // Default to South
	private readonly playerSpriteFrameDims: number[] = [16, 16];
	private spriteSheetWidth: number = 0;


	constructor() {
		super({ key: 'OverworldScene' });
	}

	init(data: { playerName: string }) {
		this.playerName = data.playerName;
	}

	preload() {
		this.load.image('tiles', 'res/overworld/tile/tiles2.gif');
		this.load.image('mapLayout', 'res/overworld/tile/maps/areamap0.gif');
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
		// Enable physics
		this.physics.world.setBounds(0, 0, 800, 600); // Set bounds for the world

		// This function creates a tilemap from the pixel data of the map layout image.
		this.createTilemapFromLayoutImage();

		// Add player sprite with physics, start with standing South frame (frame 13)
		this.player = this.physics.add.sprite(400, 300, 'player', 13);

		// Create all 8-directional animations
		this.createPlayerAnimations();

		// Initialize cursor keys
		this.cursors = this.input.keyboard!.createCursorKeys();
		this.keys = {
			w: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
			a: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			s: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
			d: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
		};

		console.log(`Overworld loaded for player: ${this.playerName}`);
	}

	update() {
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

	createTilemapFromLayoutImage() {
		const mapLayout = this.textures.get('mapLayout').getSourceImage();
		if (!(mapLayout instanceof HTMLImageElement)) {
			console.error('Map layout is not a valid image element.');
			return;
		}
		const mapWidth = mapLayout.width;
		const mapHeight = mapLayout.height;

		// Create a 2D array to hold our tilemap data
		const mapData: number[][] = Array.from({ length: mapHeight }, () => new Array(mapWidth).fill(0));

		// Create a temporary canvas to read pixel data
		const canvas = this.textures.createCanvas('tempMap', mapWidth, mapHeight);
		if (!canvas) return;
		canvas.draw(0, 0, mapLayout);
		const context = canvas.getContext();

		// Define the mapping from hex color to tile index.
		// NOTE: This is a simplified mapping. More colors from areamap0.gif will need to be added.
		const colorMap: { [key: string]: number } = {
			'#ff00ff': 0, // Fuchsia -> Tile 0 (e.g., Grass)
			'#00ffff': 1, // Aqua -> Tile 1 (e.g., Flowers)
			'#ffff00': 2  // Yellow -> Tile 2 (e.g., Dirt Path)
		};

		// Iterate over each pixel of the layout image
		for (let y = 0; y < mapHeight; y++) {
			for (let x = 0; x < mapWidth; x++) {
				const pixel = context.getImageData(x, y, 1, 1).data;
				const hexColor = Phaser.Display.Color.RGBToString(pixel[0], pixel[1], pixel[2], 255, '#');
				mapData[y][x] = colorMap[hexColor] || 0; // Default to tile 0 if color not found
			}
		}

		// Create the tilemap
		const map = this.make.tilemap({ data: mapData, tileWidth: 32, tileHeight: 32 });
		const tileset = map.addTilesetImage('tiles', 'tiles', 32, 32);
		if (tileset) {
			map.createLayer(0, tileset, 0, 0);
		}

		// Clean up the temporary canvas
		this.textures.remove('tempMap');
	}
}
