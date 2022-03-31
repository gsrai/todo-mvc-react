import { Filters } from './constants';
import { ActionTypes } from './reducers/todoReducer';

export type Filter = typeof Filters[number];

export type ID = string;

export type Todo = { id: ID; text: string; completed: boolean };

export type State = {
  readonly todos: Todo[];
  readonly filter: Filter;
};

export type Action = {
  type: ActionTypes;
  payload?: any;
};
