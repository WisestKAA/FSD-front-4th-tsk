interface ILiteEvent<T>{
    on(handler: { (data?: T): void }) : void;
}

export default ILiteEvent;
