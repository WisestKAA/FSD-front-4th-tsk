import AbstractElement from '../../../../src/plugin/view/AbstractElement/AbstractElement';

class MockAbstractElement extends AbstractElement {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  constructor() {
    super();
    this.init();
  }

  protected init(): void {
    this.$elem = $('<div>');
  }
}

export default MockAbstractElement;
