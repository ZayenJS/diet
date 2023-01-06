export type RateValue = 0 | 1 | 2 | 3 | 4 | 5;
export type RateRange = [number, number];

export class Rating {
  private readonly _rate?: RateValue;
  private readonly _range: RateRange = [0, 5];
  private static readonly _staticRange: RateRange = [0, 5];

  public static getRange(): RateRange {
    return this._staticRange;
  }

  public getRange() {
    return this._range;
  }

  constructor(rate?: RateValue, range?: RateRange) {
    if (rate) this._rate = rate;
    if (range) this._range = range;

    Object.freeze(this);
  }

  public get rate(): RateValue {
    if (!this._rate) throw new Error('No rate value provided. Please provide a rate value to the constructor.');

    return this._rate;
  }

  public get range(): RateRange {
    return this._range;
  }

  public static getRatingLabel(rating: number) {
    switch (rating) {
      case 0:
        return 'Aucune';
      case 1:
        return 'Mauvais';
      case 2:
        return 'Moyen';
      case 3:
        return 'Bon';
      case 4:
        return 'Très bon';
      case 5:
        return 'Excellent';
      default:
        return 'Inconnu';
    }
  }

  public static getRatingClassName(rating: number) {
    return `rating_icon--${rating}`;
  }

  public static getRatingMarkup(rating: number, classes?: string) {
    let markup = '';

    for (let i = 0; i < rating; i++) {
      markup += `
        <span class="${classes}"></span>
      `;
    }

    return markup;
  }

  public getRatingLabel() {}
}
