import * as THREE from 'three';

export function vectorFromAngle(angle: number): THREE.Vector3 {
  return new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
}

export function planarDistance(a: THREE.Vector3, b: THREE.Vector3): number {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.hypot(dx, dz);
}
