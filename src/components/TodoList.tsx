import { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from 'react';
import { ID, Todo } from '../types';

type TodoListProps = {
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

function TodoList(props: TodoListProps) {
  const { currentlyEditing, allCompleted, todos } = props;
  const {
    handleToggleAll,
    handleToggle,
    handleEdit,
    handleRemove,
    handleEditing,
    handleDoubleClick
  } = props;
  return (
    <main className="relative z-[2] border-t-[1px_solid_#e6e6e6] font-thin">
      <input
        id="toggle-all"
        type="checkbox"
        className="peer w-[1px] h-[1px] border-none opacity-0 absolute right-full bottom-full"
        onChange={handleToggleAll}
        checked={allCompleted}
      />
      <label
        htmlFor="toggle-all"
        className="w-14 h-9 text-[0] absolute top-[-52px] left-0 rotate-90 before:content-['❯'] before:text-xl before:py-3 before:px-7 before:text-[#e6e6e6] before:peer-checked:text-[#737373]"
      >
        Mark all as complete
      </label>
      <ul className="m-0 p-0 list-none">
        {todos.map((todo, idx) => {
          return (
            <li
              key={idx}
              className={`relative group h-14 text-2xl border-b-[1px_solid_#ededed] last:border-none ${
                currentlyEditing === todo.id ? 'border-b-0 p-0' : ''
              }`}
            >
              <div className={`${currentlyEditing === todo.id ? 'hidden' : ''}`}>
                <div className="py-4 pr-4 pl-16">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo)}
                    id={`checkbox_${idx}`}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={`checkbox_${idx}`}
                    className="bg-white rounded-full border border-solid border-neutral-300 cursor-pointer h-7 w-7 left-[18px] top-[18px] absolute after:absolute after:top-2 after:left-[7px] after:h-[6px] after:w-3 after:-rotate-45 after:opacity-0 after:content-[''] after:border-2 after:border-solid after:border-white after:border-t-0 after:border-r-0 peer-checked:bg-[#66bb6a] peer-checked:border-[#66bb6a] peer-checked:after:opacity-100"
                  ></label>
                  <label
                    onDoubleClick={() => handleDoubleClick(todo)}
                    className={`${
                      todo.completed ? 'line-through text-[#d9d9d9]' : ''
                    } break-all transition-colors ease-in delay-300`}
                  >
                    {todo.text}
                  </label>
                  <button
                    onClick={() => handleRemove(todo)}
                    className="hidden absolute top-0 right-3 bottom-0 w-10 h-10 my-auto mx-0 pt-1 text-3xl text-[#cc9a9a] transition-colors ease-out delay-200 after:content-['×'] hover:text-[#af5b5e] group-hover:block"
                  ></button>
                </div>
              </div>

              {currentlyEditing === todo.id && (
                <input
                  defaultValue={todo.text}
                  id="edit"
                  className={`relative focus:outline-none font-thin m-0 w-full text-2xl text-inherit p-2 border-[1px] border-solid border-neutral-400 box-border shadow-inner ${
                    currentlyEditing === todo.id
                      ? 'block py-3 px-4 ml-10 w-[calc(100%-43px)]'
                      : ''
                  }`}
                  onKeyDown={handleEditing}
                  onBlur={handleEdit}
                  autoFocus
                ></input>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default TodoList;
