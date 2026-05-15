import type { EventBus, GameEventMap } from '../app/EventBus';
import type { InputSystem } from '../systems/InputSystem';

export class UIManager {
  private readonly hud: HTMLDivElement;
  private paused = false;

  constructor(
    private readonly root: HTMLElement,
    events: EventBus<GameEventMap>,
    private readonly input: InputSystem
  ) {
    this.hud = document.createElement('div');
    this.hud.className = 'hud';
    this.root.appendChild(this.hud);
    this.createMobileControls();

    events.on('score:changed', ({ score }) => this.setText('score', String(score)));
    events.on('player:healthChanged', ({ health, maxHealth }) => this.setText('health', `${health}/${maxHealth}`));
    events.on('player:ammoChanged', ({ ammo, maxAmmo }) => this.setText('ammo', `${ammo}/${maxAmmo}`));
    events.on('player:dashChanged', ({ cooldownRatio }) => this.setText('dash', `${Math.round(cooldownRatio * 100)}%`));
    events.on('level:changed', ({ level, title }) => this.setText('level', `${level}. ${title}`));
    events.on('progress:changed', ({ ratio }) => this.setText('progress', `${Math.round(ratio * 100)}%`));
    events.on('game:paused', ({ paused }) => {
      this.paused = paused;
      this.setText('pause', paused ? 'Paused' : '');
    });

    this.hud.innerHTML = `
      <div class="panel"><span>სიცოცხლე</span><strong data-ui="health">5/5</strong></div>
      <div class="panel center"><span data-ui="level">1. პირველი ტური</span><strong data-ui="progress">0%</strong></div>
      <div class="panel right"><span>ქულა</span><strong data-ui="score">0</strong></div>
      <div class="bottom-panel"><span>ტყვია</span><strong data-ui="ammo">8/8</strong><span>დეში</span><strong data-ui="dash">100%</strong></div>
      <div class="pause-label" data-ui="pause"></div>
    `;
  }

  update(): void {
    document.body.classList.toggle('is-paused', this.paused);
  }

  private setText(key: string, value: string): void {
    const node = this.hud.querySelector<HTMLElement>(`[data-ui="${key}"]`);
    if (node) node.textContent = value;
  }

  private createMobileControls(): void {
    const controls = document.createElement('div');
    controls.className = 'mobile-controls';
    controls.innerHTML = `
      <button data-action="sword">ხმალი</button>
      <button data-action="dash">დეში</button>
      <button data-action="shoot" class="primary">სროლა</button>
    `;
    controls.querySelector('[data-action="shoot"]')?.addEventListener('pointerdown', () => this.input.pressShoot());
    controls.querySelector('[data-action="sword"]')?.addEventListener('pointerdown', () => this.input.pressSword());
    controls.querySelector('[data-action="dash"]')?.addEventListener('pointerdown', () => this.input.pressDash());
    this.root.appendChild(controls);
  }
}
