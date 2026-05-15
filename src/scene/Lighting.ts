import * as THREE from 'three';
import type { LevelConfig } from '../config/levels';

export class Lighting {
  private readonly sun = new THREE.DirectionalLight(0xffffff, 2.2);
  private readonly ambient = new THREE.AmbientLight(0x7a6a52, 1.4);

  constructor(private readonly scene: THREE.Scene) {
    this.sun.position.set(-320, 620, 280);
    this.sun.castShadow = true;
    this.scene.add(this.ambient, this.sun);
  }

  applyLevel(level: LevelConfig): void {
    this.scene.background = new THREE.Color(level.skyColor);
    this.scene.fog = new THREE.Fog(level.fogColor, 760, 1800);
    this.sun.color.setHex(level.lightColor);
  }
}
