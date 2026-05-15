import * as THREE from 'three';

export class WorldRoot {
  readonly object = new THREE.Group();

  clear(): void {
    this.object.clear();
  }
}
