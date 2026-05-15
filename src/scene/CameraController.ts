import * as THREE from 'three';
import { GAME_BALANCE } from '../config/gameBalance';

export class CameraController {
  private readonly offset = new THREE.Vector3(0, 680, 680);
  private readonly target = new THREE.Vector3();

  constructor(private readonly camera: THREE.OrthographicCamera) {
    this.camera.rotation.set(-Math.PI / 4, 0, 0);
  }

  snapTo(position: THREE.Vector3): void {
    this.target.copy(position).add(this.offset);
    this.camera.position.copy(this.target);
    this.camera.lookAt(position);
  }

  follow(position: THREE.Vector3, delta: number): void {
    this.target.copy(position).add(this.offset);
    const ease = 1 - Math.exp(-GAME_BALANCE.camera.followEase * delta);
    this.camera.position.lerp(this.target, ease);
    this.camera.lookAt(position.x, position.y, position.z);
  }
}
