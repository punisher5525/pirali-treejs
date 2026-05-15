import * as THREE from 'three';
import type { Time } from '../../app/Time';
import { Entity } from '../Entity';

export class Projectile extends Entity {
  velocity = new THREE.Vector3();
  life = 0;
  friendly = true;

  update(time: Time): void {
    this.object.position.addScaledVector(this.velocity, time.delta);
    this.life -= time.delta;
    this.active = this.life > 0;
  }
}
