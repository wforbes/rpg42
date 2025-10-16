import Phaser from 'phaser';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' });
  }

  create() {
    const gameWidth = this.cameras.main.width;
    const gameHeight = this.cameras.main.height;

    // Add Title
    this.add.text(gameWidth / 2, gameHeight / 4, 'rpg42', {
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Add Menu Buttons
    const menuOptions = [
      { text: 'New Game', action: () => this.scene.start('NewGameScene') },
      { text: 'Info', action: () => console.log('Info clicked') },
      { text: 'Quit', action: () => console.log('Quit clicked') }
    ];

    let yPos = gameHeight / 2;
    menuOptions.forEach(option => {
      const button = this.add.text(gameWidth / 2, yPos, option.text, {
        fontSize: '32px',
        color: '#ffffff'
      }).setOrigin(0.5);

      button.setInteractive({ useHandCursor: true });
      button.on('pointerover', () => button.setStyle({ fill: '#ff0' }));
      button.on('pointerout', () => button.setStyle({ fill: '#fff' }));
      button.on('pointerdown', option.action);

      yPos += 50;
    });
  }
}
