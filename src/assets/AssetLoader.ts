import * as THREE from 'three';

export class AssetLoader {
  private readonly textureLoader = new THREE.TextureLoader();

  loadTexture(url: string): Promise<THREE.Texture> {
    return this.textureLoader.loadAsync(url);
  }
}
