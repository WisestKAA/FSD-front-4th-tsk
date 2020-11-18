interface ILiteEvent<T>{
  on(handler: { (data?: T): void }) : void;
}

export { ILiteEvent };
