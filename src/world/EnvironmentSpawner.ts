import * as THREE from 'three';
import type { LevelConfig } from '../config/levels';

export class EnvironmentSpawner {
  createPlaceholder(_level: LevelConfig): THREE.Group {
    return new THREE.Group();
  }
}
