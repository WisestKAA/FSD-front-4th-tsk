import ILiteEvent from '../../src/plugin/LiteEvent/ILiteEvent';

class MockEvent<T> {
  constructor(handler: ILiteEvent<T>) {
    handler.on(d => this.eventHandler(d));
  }

  public eventHandler(d: T) {}
}

export { MockEvent };
