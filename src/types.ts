import { ActionTypes } from './reducers/todoReducer';

export type Filter = 'all' | 'active' | 'completed';

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
