import * as THREE from 'three';
import type { EventBus, GameEventMap } from '../app/EventBus';

export class ProgressionSystem {
  private currentLevel = 1;

  constructor(private readonly events: EventBus<GameEventMap>) {}

  setLevel(level: number, title: string): void {
    this.currentLevel = level;
    this.events.emit('level:changed', { level: this.currentLevel, title });
  }

  update(playerPosition: THREE.Vector3, churchPosition: THREE.Vector3): void {
    const total = Math.max(1, Math.abs(churchPosition.z - 1750));
    const traveled = Math.max(0, 1750 - playerPosition.z);
    this.events.emit('progress:changed', { ratio: Math.min(1, traveled / total) });
  }
}
