import bind from 'bind-decorator';

import { IObserver } from './Observer.types';

class Observer<T> implements IObserver<T> {
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
  public expose() : IObserver<T> {
    return this;
  }

  private handlers: { (data?: T): void; }[] = [];
}

export default Observer;
