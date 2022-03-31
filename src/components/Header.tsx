import { KeyboardEvent } from 'react';

type HeaderProps = {
  readonly handleNewTodo: (e: KeyboardEvent<HTMLInputElement>) => void;
};

function Header({ handleNewTodo }: HeaderProps) {
  return (
    <header>
      <h1 className="absolute -top-28 w-full text-8xl font-thin text-center text-[rgba(175,47,47,0.15)]">
        todos
      </h1>
      <input
        type="text"
        className="input-placeholder focus:outline-none relative m-0 w-full text-2xl font-thin text-inherit py-4 pr-4 pl-16 border-none box-border shadow-inner bg-[rgba(0,0,0,0.003)]"
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={handleNewTodo}
      />
    </header>
  );
}

export default Header;
