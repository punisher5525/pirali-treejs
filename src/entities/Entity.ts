import * as THREE from 'three';
import type { Time } from '../app/Time';

export abstract class Entity {
  readonly object = new THREE.Group();
  active = true;

  abstract update(time: Time): void;
}
