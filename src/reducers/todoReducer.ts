import { genUniqueId } from '../utils/helpers';
import { Filter, ID, State, Action } from '../types';

/* Actions */

export enum ActionTypes {
  ADD_TODO = 'todos/ADD',
  EDIT_TODO = 'todos/EDIT',
  REMOVE_TODO = 'todos/REMOVE',
  TOGGLE_TODO = 'todos/TOGGLE',
  SET_ALL_COMPLETED = 'todos/ALL_COMPLETED',
  CLEAR_ALL_COMPLETED = 'todos/CLEAR_ALL_COMPLETED',
  CHANGE_FILTER = 'filter/CHANGE'
}

/* Action Creators */

export const addTodo = (text: string) => ({
  type: ActionTypes.ADD_TODO,
  payload: text
});

export const editTodo = (id: ID, text: string) => ({
  type: ActionTypes.EDIT_TODO,
  payload: { id, text }
});

export const toggleTodo = (id: ID) => ({
  type: ActionTypes.TOGGLE_TODO,
  payload: id
});

export const removeTodo = (id: ID) => ({
  type: ActionTypes.REMOVE_TODO,
  payload: id
});

export const toggleCompleted = (isChecked: boolean) => ({
  type: ActionTypes.SET_ALL_COMPLETED,
  payload: isChecked
});

export const clearAllCompleted = () => ({
  type: ActionTypes.CLEAR_ALL_COMPLETED
});

export const changeFilter = (filterValue: Filter) => ({
  type: ActionTypes.CHANGE_FILTER,
  payload: filterValue
});

/* Selectors */

export const selectTodos = (state: State) => state.todos;

export const selectFilter = (state: State) => state.filter;

/* Reducer */

export const initialState: State = {
  todos: [],
  filter: 'all'
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: genUniqueId(), text: action.payload, completed: false }
        ]
      };
    case ActionTypes.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, text: action.payload.text };
          }
          return todo;
        })
      };
    case ActionTypes.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        })
      };
    case ActionTypes.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };
    case ActionTypes.SET_ALL_COMPLETED:
      return {
        ...state,
        todos: state.todos.map((todo) => ({ ...todo, completed: action.payload }))
      };
    case ActionTypes.CLEAR_ALL_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed)
      };
    case ActionTypes.CHANGE_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    default:
      throw new Error(`Invalid action type (type=${action.type}) passed to reducer`);
  }
}
