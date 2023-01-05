import { State } from '../..';

export interface InputChangePayload {
  value: string;
  name: string;
  reducerName: keyof State;
}
