import bind from 'bind-decorator';

import ILiteEvent from './ILiteEvent';

class LiteEvent<T> implements ILiteEvent<T> {
  @bind
  public on(handler: { (data?: T): void }) : void {
    this.handlers.push(handler);
  }

  @bind
  public trigger(data?: T) {
    this.handlers.slice(0).forEach((handler) => {
      return handler(data);
    });
  }

  @bind
  public expose() : ILiteEvent<T> {
    return this;
  }

  private handlers: { (data?: T): void; }[] = [];
}

export default LiteEvent;
