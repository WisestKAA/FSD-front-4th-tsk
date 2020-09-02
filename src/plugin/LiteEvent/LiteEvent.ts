import ILiteEvent from './ILiteEvent';

class LiteEvent<T> implements ILiteEvent<T> {
    private handlers: { (data?: T): void; }[] = [];

    public on(handler: { (data?: T): void }) : void {
      this.handlers.push(handler);
    }

    public trigger(data?: T) {
      this.handlers.slice(0).forEach((handler) => {
        return handler(data);
      });
    }

    public expose() : ILiteEvent<T> {
      return this;
    }
}

export default LiteEvent;
