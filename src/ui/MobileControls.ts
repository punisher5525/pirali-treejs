import type { InputSystem } from '../systems/InputSystem';

export class MobileControls {
  constructor(readonly element: HTMLElement, readonly input: InputSystem) {}
}
