import { State } from '../..';
import { FakeImagePreview } from '../../../@types/interfaces/FakeImagePreview';

export interface InputChangePayload {
  value: string |  FakeImagePreview[]
  name: string;
  reducerName: keyof State;
}
