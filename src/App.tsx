import { SyntheticEvent, useState, KeyboardEvent } from 'react';
import { Filter, ID, Todo } from './types';
import { useStore } from './contexts/StoreContext';
import {
  addTodo,
  clearAllCompleted,
  editTodo,
  toggleTodo,
  removeTodo,
  selectFilter,
  selectTodos,
  toggleCompleted,
  changeFilter
} from './reducers/todoReducer';

const ENTER_KEY = 'Enter';
const ESCAPE_KEY = 'Escape';

function App() {
  const { dispatch, state } = useStore();
  const items: Todo[] = selectTodos(state);
  const currentFilter: Filter = selectFilter(state);
  const [editing, setEditing] = useState<ID>('');
  const filteredItems =
    currentFilter === 'all'
      ? items
      : currentFilter === 'completed'
      ? items.filter((item) => item.completed)
      : items.filter((item) => !item.completed);
  const numActive = items.filter((item) => !item.completed).length;
  const numCompleted = items.filter((item) => item.completed).length;

  const handleUpdateView = (filter: Filter) => {
    dispatch(changeFilter(filter));
  };

  const handleNewTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ENTER_KEY) {
      dispatch(addTodo(e.currentTarget.value));
      e.currentTarget.value = '';
    }
  };
  const handleEditingTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ENTER_KEY) {
      e.currentTarget.blur();
    } else if (e.key === ESCAPE_KEY) {
      setEditing('');
    }
  };
  const handleEditTodo = (e: SyntheticEvent<HTMLInputElement>) => {
    dispatch(editTodo(editing, e.currentTarget.value));
    setEditing('');
  };
  const handleToggleAll = (e: SyntheticEvent<HTMLInputElement>) =>
    dispatch(toggleCompleted(e.currentTarget.checked));
  const handleClear = () => dispatch(clearAllCompleted());
  const handleEdit = (id: ID) => setEditing(id);
  const handleRemove = (id: ID) => dispatch(removeTodo(id));
  return (
    <div className="bg-white mt-32 mb-10 relative shadow-[0_2px_4px_0_rgba(0,0,0,0.2),_0_25px_50px_0_rgba(0,0,0,0.1)] max-w-xl min-w-fit my-0 mx-auto">
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
      {items.length > 0 && (
        <main className="relative z-[2] border-t-[1px_solid_#e6e6e6] font-thin">
          <input
            id="toggle-all"
            type="checkbox"
            className="peer w-[1px] h-[1px] border-none opacity-0 absolute right-full bottom-full"
            onChange={handleToggleAll}
            checked={numCompleted === items.length}
          />
          <label
            htmlFor="toggle-all"
            className="w-14 h-9 text-[0] absolute top-[-52px] left-0 rotate-90 before:content-['❯'] before:text-xl before:py-3 before:px-7 before:text-[#e6e6e6] before:peer-checked:text-[#737373]"
          >
            Mark all as complete
          </label>
          <ul className="m-0 p-0 list-none">
            {filteredItems.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className={`relative group h-14 text-2xl border-b-[1px_solid_#ededed] last:border-none ${
                    editing === item.id ? 'border-b-0 p-0' : ''
                  }`}
                >
                  <div className={`${editing === item.id ? 'hidden' : ''}`}>
                    <div className="py-4 pr-4 pl-16">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => dispatch(toggleTodo(item.id))}
                        id={`checkbox_${idx}`}
                        className="peer hidden"
                      />
                      <label
                        htmlFor={`checkbox_${idx}`}
                        className="bg-white rounded-full border border-solid border-neutral-300 cursor-pointer h-7 w-7 left-[18px] top-[18px] absolute after:absolute after:top-2 after:left-[7px] after:h-[6px] after:w-3 after:-rotate-45 after:opacity-0 after:content-[''] after:border-2 after:border-solid after:border-white after:border-t-0 after:border-r-0 peer-checked:bg-[#66bb6a] peer-checked:border-[#66bb6a] peer-checked:after:opacity-100"
                      ></label>
                      <label
                        onDoubleClick={() => handleEdit(item.id)}
                        className={`${
                          item.completed ? 'line-through text-[#d9d9d9]' : ''
                        } break-all transition-colors ease-in delay-300`}
                      >
                        {item.text}
                      </label>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="hidden absolute top-0 right-3 bottom-0 w-10 h-10 my-auto mx-0 pt-1 text-3xl text-[#cc9a9a] transition-colors ease-out delay-200 after:content-['×'] hover:text-[#af5b5e] group-hover:block"
                      ></button>
                    </div>
                  </div>

                  {editing === item.id && (
                    <input
                      defaultValue={item.text}
                      id="edit"
                      className={`relative focus:outline-none font-thin m-0 w-full text-2xl text-inherit p-2 border-[1px] border-solid border-neutral-400 box-border shadow-inner ${
                        editing === item.id
                          ? 'block py-3 px-4 ml-10 w-[calc(100%-43px)]'
                          : ''
                      }`}
                      onKeyDown={handleEditingTodo}
                      onBlur={handleEditTodo}
                      autoFocus
                    ></input>
                  )}
                </li>
              );
            })}
          </ul>
        </main>
      )}
      {items.length > 0 && (
        <footer className="footer">
          <span className="text-left float-left leading-7">
            <strong className="font-light">{numActive}</strong>{' '}
            {numActive === 1 ? 'item' : 'items'} left
          </span>

          <ul className="m-0 p-0 list-none absolute right-0 left-0">
            <li className="inline">
              <button
                className={`${
                  currentFilter === 'all' ? 'border-[rgba(175,47,47,0.2)]' : ''
                } filter-button`}
                onClick={() => handleUpdateView('all')}
              >
                All
              </button>
            </li>
            <li className="inline">
              <button
                className={`${
                  currentFilter === 'active' ? 'border-[rgba(175,47,47,0.2)]' : ''
                } filter-button`}
                onClick={() => handleUpdateView('active')}
              >
                Active
              </button>
            </li>
            <li className="inline">
              <button
                className={`${
                  currentFilter === 'completed' ? 'border-[rgba(175,47,47,0.2)]' : ''
                } filter-button`}
                onClick={() => handleUpdateView('completed')}
              >
                Completed
              </button>
            </li>
          </ul>

          {!!numCompleted && (
            <button
              onClick={handleClear}
              className="float-right relative no-underline cursor-pointer leading-5 hover:underline"
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
}

export default App;
