import {
  ButtonHTMLAttributes,
  ChangeEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
  KeyboardEventHandler,
  LabelHTMLAttributes
} from 'react';
import { ID, Todo } from '../../types';

export type TodoListItemProps = {
  readonly currentlyEditing?: ID;
  readonly todoId: ID;
};

export type ToggleAllInputProps = InputHTMLAttributes<HTMLInputElement>;

export type ToggleAllLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export type CheckboxLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export type RemoveButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type TodoTextLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  readonly completed: boolean;
};

export type EditInputProps = InputHTMLAttributes<HTMLInputElement> &
  TodoListItemProps;

export type TodoListProps = {
  readonly currentlyEditing?: ID;
  readonly allCompleted: boolean;
  readonly todos: Todo[];
  readonly handleToggleAll: ChangeEventHandler<HTMLInputElement>;
  readonly handleEdit: FocusEventHandler<HTMLInputElement>;
  readonly handleEditing: KeyboardEventHandler<HTMLInputElement>;
  readonly handleRemove: (todo: Todo) => void;
  readonly handleToggle: (todo: Todo) => void;
  readonly handleDoubleClick: (todo: Todo) => void;
};
