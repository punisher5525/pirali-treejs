import * as THREE from 'three';

export class Obstacle {
  constructor(
    readonly object: THREE.Object3D,
    readonly radius: number
  ) {}
}
