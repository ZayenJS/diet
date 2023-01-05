import { Unit as UnitEnum } from '@prisma/client';

export class Unit {
  private _id: number;
  private _name: UnitEnum;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(id: number, name: UnitEnum, createdAt: Date, updatedAt: Date) {
    this._id = id;
    this._name = name;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get updatedAt() {
    return this._updatedAt;
  }

  public static getAll() {
    return Object.values(UnitEnum);
  }

  public static getUnitLabel(unit: UnitEnum) {
    switch (unit) {
      case UnitEnum.GRAM:
        return 'g';
      case UnitEnum.KILOGRAM:
        return 'kg';
      case UnitEnum.LITER:
        return 'L';
      case UnitEnum.MILLILITER:
        return 'mL';
      case UnitEnum.PIECE:
        return 'pièce';
      case UnitEnum.CUP:
        return 'tasse';
      case UnitEnum.TABLESPOON:
        return 'cuillère à soupe';
      case UnitEnum.TEASPOON:
        return 'cuillère à thé';
      case UnitEnum.PINCH:
        return 'pincée';
      default:
        return 'Inconnu';
    }
  }
}
