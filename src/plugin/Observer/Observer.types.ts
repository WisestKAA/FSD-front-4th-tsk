interface IObserver<T>{
  on(handler: { (data?: T): void }) : void;
}

export { IObserver };
