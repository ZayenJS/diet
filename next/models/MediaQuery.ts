export enum MediaQuerySize {
  MIN_XS = 'MIN_XS',
  MIN_SM = 'MIN_SM',
  MIN_MD = 'MIN_MD',
  MIN_LG = 'MIN_LG',
  MIN_XL = 'MIN_XL',
  MIN_XXL = 'MIN_XXL',
  MAX_XS = 'MAX_XS',
  MAX_SM = 'MAX_SM',
  MAX_MD = 'MAX_MD',
  MAX_LG = 'MAX_LG',
  MAX_XL = 'MAX_XL',
  MAX_XXL = 'MAX_XXL',
}

export class MediaQuery {
  public static readonly [MediaQuerySize.MIN_XS]: string = '412px';
  public static readonly [MediaQuerySize.MIN_SM]: string = '576px';
  public static readonly [MediaQuerySize.MIN_MD]: string = '768px';
  public static readonly [MediaQuerySize.MIN_LG]: string = '992px';
  public static readonly [MediaQuerySize.MIN_XL]: string = '1200px';
  public static readonly [MediaQuerySize.MIN_XXL]: string = '1600px';

  public static readonly [MediaQuerySize.MAX_XS]: string = '411px';
  public static readonly [MediaQuerySize.MAX_SM]: string = '575px';
  public static readonly [MediaQuerySize.MAX_MD]: string = '767px';
  public static readonly [MediaQuerySize.MAX_LG]: string = '991px';
  public static readonly [MediaQuerySize.MAX_XL]: string = '1199px';
  public static readonly [MediaQuerySize.MAX_XXL]: string = '1599px';

  private _mq: MediaQueryList | null = null;

  public constructor(size: MediaQuerySize, private _callback: (event: MediaQueryListEvent) => void) {
    this._mq = window.matchMedia(`(min-width: ${MediaQuery[size]})`);
    this._mq.addEventListener('change', this._callback);
  }

  public remove() {
    if (!this._mq) return;

    this._mq.removeEventListener('change', this._callback);
    this._mq = null;
  }

  public executeIfMatches() {
    if (!this._mq) return this;

    this._callback({ matches: this._mq.matches, media: this._mq.media } as MediaQueryListEvent);

    return this;
  }
}
