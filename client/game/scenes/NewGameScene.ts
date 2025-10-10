import Phaser from 'phaser';

export class NewGameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'NewGameScene' });
  }

  create() {
    const gameWidth = this.cameras.main.width;
    const gameHeight = this.cameras.main.height;

    // Add Title
    this.add.text(gameWidth / 2, gameHeight / 4, 'New Game', {
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Add text input for player name
    const nameInput = this.add.dom(gameWidth / 2, gameHeight / 2).createFromHTML(`
      <input type="text" name="name" placeholder="Enter your name" style="width: 250px; padding: 10px; font-size: 16px;">
    `);

    // Add Start Game button
    const startButton = this.add.text(gameWidth / 2, gameHeight / 2 + 100, 'Start Game', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);

    startButton.setInteractive({ useHandCursor: true });
    startButton.on('pointerover', () => startButton.setStyle({ fill: '#ff0' }));
    startButton.on('pointerout', () => startButton.setStyle({ fill: '#fff' }));
    startButton.on('pointerdown', () => {
      const name = (nameInput.getChildByName('name') as HTMLInputElement).value;
      if (name) {
        this.scene.start('OverworldScene', { playerName: name });
      } else {
        // Optional: Add some visual feedback for the user
        const message = this.add.text(gameWidth / 2, gameHeight / 2 + 150, 'Please enter a name.', {
          color: '#ff0000'
        }).setOrigin(0.5);
        this.time.delayedCall(2000, () => message.destroy());
      }
    });
  }
}
