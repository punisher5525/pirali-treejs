import * as THREE from 'three';
import type { EnemyType } from '../../config/enemies';

export class EnemyFactory {
  createPlaceholder(type: EnemyType): THREE.Group {
    const color = type === 'officer' ? 0x7a1111 : type === 'saber' ? 0x3d3d24 : 0x2f3d52;
    const group = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(12, 28, 4, 8), new THREE.MeshStandardMaterial({ color }));
    body.position.y = 24;
    body.castShadow = true;
    group.add(body);
    return group;
  }
}
