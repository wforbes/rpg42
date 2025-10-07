import Phaser from 'phaser';

export class OverworldScene extends Phaser.Scene {
  private playerName: string = '';

  constructor() {
    super({ key: 'OverworldScene' });
  }

  init(data: { playerName: string }) {
    this.playerName = data.playerName;
  }

  create() {
    this.add.text(100, 100, `Overworld - Welcome, ${this.playerName}!`, { color: '#ffffff' });
  }
}
