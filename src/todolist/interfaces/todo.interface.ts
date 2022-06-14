import { Document } from 'mongoose';

export interface Todo extends Document {
  readonly title: string;
  readonly achieved: boolean;
}
