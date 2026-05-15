import { EventBus, type GameEventMap } from './EventBus';
import { GameLoop } from './GameLoop';
import type { Time } from './Time';
import { LEVELS } from '../config/levels';
import { SceneManager } from '../scene/SceneManager';
import { CameraController } from '../scene/CameraController';
import { Lighting } from '../scene/Lighting';
import { InputSystem } from '../systems/InputSystem';
import { ScoreSystem } from '../systems/ScoreSystem';
import { ProgressionSystem } from '../systems/ProgressionSystem';
import { WorldGenerator } from '../world/WorldGenerator';
import { PlayerController } from '../entities/Player/PlayerController';
import { UIManager } from '../ui/UIManager';

export class GameApp {
  readonly events = new EventBus<GameEventMap>();
  private readonly sceneManager: SceneManager;
  private readonly input = new InputSystem();
  private readonly score = new ScoreSystem(this.events);
  private readonly progression = new ProgressionSystem(this.events);
  private readonly world = new WorldGenerator();
  private readonly player: PlayerController;
  private readonly camera: CameraController;
  private readonly lighting: Lighting;
  private readonly ui: UIManager;
  private readonly loop: GameLoop;
  private paused = false;

  constructor(private readonly root: HTMLElement) {
    this.sceneManager = new SceneManager(root);
    this.camera = new CameraController(this.sceneManager.camera);
    this.lighting = new Lighting(this.sceneManager.scene);
    this.player = new PlayerController(this.events, this.input);
    this.ui = new UIManager(root, this.events, this.input);
    this.loop = new GameLoop((time) => this.update(time));

    this.sceneManager.scene.add(this.player.object);
    this.resetLevel(1);
    this.bindAppEvents();
  }

  start(): void {
    this.loop.start();
  }

  private bindAppEvents(): void {
    window.addEventListener('resize', () => this.sceneManager.resize());
    this.input.onPauseToggle(() => {
      this.paused = !this.paused;
      this.events.emit('game:paused', { paused: this.paused });
    });
  }

  private resetLevel(levelNumber: number): void {
    const level = LEVELS[levelNumber - 1] ?? LEVELS[0];
    this.world.generate(this.sceneManager.scene, level);
    this.player.reset(this.world.startPosition);
    this.lighting.applyLevel(level);
    this.camera.snapTo(this.player.object.position);
    this.progression.setLevel(levelNumber, level.title);
    this.score.reset();
  }

  private update(time: Time): void {
    this.input.update();

    if (!this.paused) {
      this.player.update(time);
      this.camera.follow(this.player.object.position, time.delta);
      this.progression.update(this.player.object.position, this.world.churchPosition);
    }

    this.ui.update();
    this.sceneManager.render();
  }
}
