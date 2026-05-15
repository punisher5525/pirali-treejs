import * as THREE from 'three';
import { GAME_BALANCE } from '../config/gameBalance';

export class PathGenerator {
  generate(level: number): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    const halfWidth = GAME_BALANCE.world.width / 2;
    const startZ = GAME_BALANCE.world.height / 2 - 120;
    const churchZ = -GAME_BALANCE.world.height / 2 + 160;
    const steps = 14 + level * 2;

    let x = 0;
    let z = startZ;
    points.push(new THREE.Vector3(x, 0, z));

    for (let i = 0; i < steps; i += 1) {
      z -= 190 + Math.random() * 140;
      const steerFraction = Math.max(0, (i - (steps - 3)) / 3);
      const drift = (Math.random() - 0.5) * 270 * (1 - steerFraction);
      const steer = (0 - x) * steerFraction * 0.55;
      x = THREE.MathUtils.clamp(x + drift + steer, -halfWidth + 210, halfWidth - 210);
      points.push(new THREE.Vector3(x, 0, z));
    }

    points.push(new THREE.Vector3(0, 0, (z + churchZ) / 2));
    points.push(new THREE.Vector3(0, 0, churchZ + 70));
    return points;
  }
}
