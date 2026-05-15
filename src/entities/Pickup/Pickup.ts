import * as THREE from 'three';
import type { PickupType } from '../../config/pickups';

export class Pickup {
  readonly object = new THREE.Group();

  constructor(readonly type: PickupType, color: number) {
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(14, 0),
      new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.15 })
    );
    mesh.position.y = 18;
    this.object.add(mesh);
  }
}
