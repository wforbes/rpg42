import Phaser from 'phaser';

export class OverworldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OverworldScene' });
  }

  create() {
    this.add.text(100, 100, 'Overworld', { color: '#ffffff' });
  }
}
