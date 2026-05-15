import * as THREE from 'three';

export type CircleCollider = {
  center: THREE.Vector3;
  radius: number;
};

export function intersectsCircle(a: CircleCollider, b: CircleCollider): boolean {
  const dx = a.center.x - b.center.x;
  const dz = a.center.z - b.center.z;
  const radius = a.radius + b.radius;
  return dx * dx + dz * dz <= radius * radius;
}
