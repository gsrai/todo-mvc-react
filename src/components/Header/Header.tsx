import { Title, NewTodoInput } from './styles';
import { HeaderProps } from './types';

export function Header({ handleNewTodo }: HeaderProps) {
  return (
    <header>
      <Title>todos</Title>
      <NewTodoInput
        type="text"
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={handleNewTodo}
      />
    </header>
  );
}
