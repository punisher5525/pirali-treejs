export class StateMachine<TState extends string> {
  constructor(private currentState: TState) {}

  get state(): TState {
    return this.currentState;
  }

  transition(nextState: TState): boolean {
    if (this.currentState === nextState) return false;
    this.currentState = nextState;
    return true;
  }
}
