import { KeyboardEvent, InputHTMLAttributes } from 'react';

export type HeaderProps = {
  readonly handleNewTodo: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export type NewTodoInputProps = InputHTMLAttributes<HTMLInputElement>;
