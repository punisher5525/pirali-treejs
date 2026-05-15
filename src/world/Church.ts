import * as THREE from 'three';

export class Church {
  readonly object = new THREE.Group();

  constructor(position: THREE.Vector3) {
    this.object.position.copy(position);
  }
}
