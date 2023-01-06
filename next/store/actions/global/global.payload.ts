import { State } from '../..';

export interface InputChangePayload {
  value: string | File | File[];
  name: string;
  reducerName: keyof State;
}
