import './style.css';
import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MainMenuScene } from './scenes/MainMenuScene';
import { NewGameScene } from './scenes/NewGameScene';
import { OverworldScene } from './scenes/OverworldScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app',
  dom: {
    createContainer: true
  },
  scene: [BootScene, MainMenuScene, NewGameScene, OverworldScene]
};

new Phaser.Game(config);
