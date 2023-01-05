type RandomType = 'id' | 'integer' | 'float' | 'string' | 'boolean' | 'array' | 'object';

export class Random<T> {
  private _data: T;

  constructor(type: RandomType, length?: number) {
    switch (type) {
      case 'id':
        this._data = Random.id() as unknown as T;
        break;
      case 'integer':
        this._data = Random.integer(0, length ?? 100) as unknown as T;
        break;
      case 'float':
        this._data = Random.float(0, length ?? 100) as unknown as T;
        break;
      case 'string':
        this._data = Random.string(length ?? 10) as unknown as T;
        break;
      case 'boolean':
        this._data = Random.boolean() as unknown as T;
        break;
      case 'array':
        this._data = Random.array(length ?? 10, 'string') as unknown as T;
        break;
      case 'object':
        this._data = Random.object(length ?? 10, 'string') as unknown as T;
        break;
      default:
        const types = ['integer', 'float', 'string', 'boolean', 'array', 'object'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        //@ts-ignore
        this._data = Random[randomType]() as unknown as T;
    }
  }

  public get data() {
    return this._data;
  }

  public static id() {
    return `${Random.string(5)}-${Random.integer(10_000, 99_999)}-${Random.string(5)}-${Random.integer(
      100_000_000_000,
      999_999_999_999,
    )}`;
  }

  public static integer(min: number = 1, max: number = 100) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public static float(min: number = 10, max: number = 100) {
    return Math.random() * (max - min) + min;
  }

  public static string(length: number = 10): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  public static boolean() {
    return Math.random() >= 0.5;
  }

  public static array<RandomType>(
    length: number = 10,
    type: RandomType = 'string' as unknown as RandomType,
  ): RandomType[] {
    const array = [];

    for (let i = 0; i < length; i++) {
      // @ts-ignore
      array.push(Random[type]());
    }

    return array;
  }

  public static object(length: number = 10, type: RandomType = 'string' as unknown as RandomType) {
    const object = {};

    for (let i = 0; i < length; i++) {
      // @ts-ignore
      object[Random.string(10)] = Random[type]();
    }

    return object;
  }
}
