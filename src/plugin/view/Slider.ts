export class Slider{
    $elem: JQuery<HTMLElement>;

    constructor(elem: HTMLElement){
        this.init(elem);
    }

    init(elem: HTMLElement){
        this.$elem = $(elem).add('div').addClass('simpleslider');
    }
}