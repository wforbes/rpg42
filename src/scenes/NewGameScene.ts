import Phaser from 'phaser';

export class NewGameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'NewGameScene' });
  }

  create() {
    this.add.text(100, 100, 'New Game', { color: '#ffffff' });
  }
}
