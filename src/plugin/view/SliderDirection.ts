class SliderDirection {
  static get TOP(): string {
    return 'top';
  }

  static get RIGHT(): string {
    return 'right';
  }

  static get BOTTOM(): string {
    return 'bottom';
  }

  static get LEFT(): string {
    return 'left';
  }

  static getDirection(isFrom: boolean, isHorizontal: boolean): string {
    if (isFrom) {
      return isHorizontal ? this.LEFT : this.BOTTOM;
    }
    return isHorizontal ? this.RIGHT : this.TOP;
  }

  static isFrom(direction: SliderDirection): boolean {
    return !!(direction === this.LEFT || direction === this.BOTTOM);
  }

  static getReverseDirection(direction: SliderDirection): SliderDirection {
    let result: SliderDirection;
    switch (direction) {
    case SliderDirection.TOP: {
      result = SliderDirection.BOTTOM;
      break;
    }
    case SliderDirection.BOTTOM: {
      result = SliderDirection.TOP;
      break;
    }
    case SliderDirection.RIGHT: {
      result = SliderDirection.LEFT;
      break;
    }
    case SliderDirection.LEFT: {
      result = SliderDirection.RIGHT;
      break;
    }
    default: result = null;
    }

    return result;
  }
}

export default SliderDirection;
