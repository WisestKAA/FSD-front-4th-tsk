class SliderDirection {
  static get TOP (): string {
    return 'top'
  }
  static get RIGHT (): string {
    return 'right'
  }
  static get BOTTOM (): string {
    return 'bottom'
  }
  static get LEFT (): string {
    return 'left'
  }
    
  static getDiraction (isFrom: boolean, isHorizontal: boolean): string {
    if (isFrom) {
      return isHorizontal ? this.LEFT : this.BOTTOM;
    } else {
      return isHorizontal ? this.RIGHT : this.TOP;
    }
  }

  static isFrom (direction: SliderDirection): boolean {
    return !!(direction === this.LEFT || direction === this.BOTTOM);
  }
}

export default SliderDirection;
