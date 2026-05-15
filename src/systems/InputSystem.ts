import * as THREE from 'three';

export type InputCommand = {
  move: THREE.Vector2;
  shootPressed: boolean;
  swordPressed: boolean;
  dashPressed: boolean;
};

type PauseHandler = () => void;

export class InputSystem {
  readonly command: InputCommand = {
    move: new THREE.Vector2(),
    shootPressed: false,
    swordPressed: false,
    dashPressed: false
  };

  private readonly keys = new Set<string>();
  private pauseHandlers: PauseHandler[] = [];

  constructor() {
    window.addEventListener('keydown', (event) => this.handleKeyDown(event));
    window.addEventListener('keyup', (event) => this.keys.delete(event.code));
  }

  update(): void {
    const x = Number(this.keys.has('ArrowRight') || this.keys.has('KeyD')) - Number(this.keys.has('ArrowLeft') || this.keys.has('KeyA'));
    const y = Number(this.keys.has('ArrowUp') || this.keys.has('KeyW')) - Number(this.keys.has('ArrowDown') || this.keys.has('KeyS'));

    this.command.move.set(x, y);
    if (this.command.move.lengthSq() > 1) {
      this.command.move.normalize();
    }
  }

  consumeShoot(): boolean {
    return this.consume('shootPressed');
  }

  consumeSword(): boolean {
    return this.consume('swordPressed');
  }

  consumeDash(): boolean {
    return this.consume('dashPressed');
  }

  setMobileMove(x: number, y: number): void {
    this.command.move.set(x, y);
  }

  pressShoot(): void {
    this.command.shootPressed = true;
  }

  pressSword(): void {
    this.command.swordPressed = true;
  }

  pressDash(): void {
    this.command.dashPressed = true;
  }

  onPauseToggle(handler: PauseHandler): void {
    this.pauseHandlers.push(handler);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    this.keys.add(event.code);

    if (event.code === 'KeyZ' || event.code === 'MouseLeft') this.command.shootPressed = true;
    if (event.code === 'KeyX') this.command.swordPressed = true;
    if (event.code === 'KeyC' || event.code === 'Space') this.command.dashPressed = true;
    if (event.code === 'Escape' || event.code === 'KeyP') this.pauseHandlers.forEach((handler) => handler());
  }

  private consume(key: keyof Pick<InputCommand, 'shootPressed' | 'swordPressed' | 'dashPressed'>): boolean {
    const value = this.command[key];
    this.command[key] = false;
    return value;
  }
}
