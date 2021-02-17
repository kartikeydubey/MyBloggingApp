import { BlogModel } from './Models/BlogModel';

export interface AppState {
  readonly blog: BlogModel[];
}