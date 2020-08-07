import ILiteEvent from './ILiteEvent';

class LiteEvent<T> implements ILiteEvent<T> {
    private handlers: { (data?: T): void; }[] = [];

    public on (handler: { (data?: T): void }) : void {
      this.handlers.push(handler);
    }

    // public off(handler: { (data?: T): void }) : void {
    //     this.handlers = this.handlers.filter(h => h !== handler);
    // }

    public trigger (data?: T) {
      this.handlers.slice(0).forEach((h) => {
        return h(data)
      });
    }

    public expose () : ILiteEvent<T> {
      return this;
    }
}

export default LiteEvent;
