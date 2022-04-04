import { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from 'react';
import { ID, Todo } from '../../types';

export type TodoListItemProps = {
  readonly currentlyEditing?: ID;
  readonly todoId: ID;
};

export type ToggleAllInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export type ToggleAllLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export type CheckboxLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export type RemoveButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type TodoTextLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  readonly completed: boolean;
};

export type EditInputProps = React.InputHTMLAttributes<HTMLInputElement> &
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
