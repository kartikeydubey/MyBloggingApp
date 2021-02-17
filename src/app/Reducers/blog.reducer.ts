import { BlogModel } from '../Models/BlogModel';
import { Action } from '@ngrx/store';

export const ADD_BLOG = 'ADD_BLOG';
export const EDIT_BLOG = 'EDIT_BLOG';
export const DELETE_BLOG = 'DELETE_BLOG';
export const SORT_BLOG = 'SORT_BLOG';

export function blogReducer(state: BlogModel[] = [], action) {
  switch (action.type) {
    case ADD_BLOG:
      return [...state, action.payload];
    case EDIT_BLOG:
      const editIndex: number = state.findIndex(
        (x) => x.id == action.payload.id
      );
      let editState = [...state];
      editState[editIndex] = action.payload;
      return editState;
    case DELETE_BLOG:
      const delIndex: number = state.findIndex(
        (x) => x.id == action.payload.id
      );
      let delState = [...state];
      delState.splice(delIndex, 1);
      //return delState.length == 0 ? [] : delState;
      return delState;
    case SORT_BLOG:
      let sortState = [...state];
      if (action.payload.isAscending) {
        sortState = sortState.sort((a: any, b: any) => {
          return +new Date(a.date) - +new Date(b.date);
        });
      } else {
        sortState = sortState.sort((a: any, b: any) => {
          return +new Date(b.date) - +new Date(a.date);
        });
      }
      return sortState;
    default:
      return state;
  }
}
