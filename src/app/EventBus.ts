export type GameEventMap = {
  'score:changed': { score: number };
  'player:healthChanged': { health: number; maxHealth: number };
  'player:ammoChanged': { ammo: number; maxAmmo: number };
  'player:dashChanged': { cooldownRatio: number };
  'level:changed': { level: number; title: string };
  'progress:changed': { ratio: number };
  'game:paused': { paused: boolean };
};

type Handler<T> = (payload: T) => void;

export class EventBus<Events extends object = GameEventMap> {
  private readonly handlers = new Map<keyof Events, Set<Handler<Events[keyof Events]>>>();

  on<K extends keyof Events>(type: K, handler: Handler<Events[K]>): () => void {
    const bucket = this.handlers.get(type) ?? new Set();
    bucket.add(handler as Handler<Events[keyof Events]>);
    this.handlers.set(type, bucket);

    return () => bucket.delete(handler as Handler<Events[keyof Events]>);
  }

  emit<K extends keyof Events>(type: K, payload: Events[K]): void {
    this.handlers.get(type)?.forEach((handler) => handler(payload));
  }

  clear(): void {
    this.handlers.clear();
  }
}
