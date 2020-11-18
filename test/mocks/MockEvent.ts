import { IObserver } from '../../src/plugin/Observer/Observer.types';

class MockEvent<T> {
  constructor(handler: IObserver<T>) {
    handler.on(d => this.eventHandler(d));
  }

  public eventHandler(d: T) {}
}

export { MockEvent };
