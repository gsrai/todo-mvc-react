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
    <div className="">
      <header className="">
        <h1>todos</h1>
        <input
          type="text"
          placeholder="What needs to be done?"
          autoFocus
          onKeyDown={handleNewTodo}
        />
      </header>
      {items.length > 0 && (
        <main>
          <input
            id="toggle-all"
            type="checkbox"
            onChange={handleToggleAll}
            checked={numCompleted === items.length}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul>
            {filteredItems.map((item, idx) => {
              return (
                <li key={idx}>
                  <div>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => dispatch(toggleTodo(item.id))}
                    />
                    <label onDoubleClick={() => handleEdit(item.id)}>
                      {item.text}
                    </label>
                    <button onClick={() => handleRemove(item.id)}></button>
                  </div>

                  {editing === item.id && (
                    <input
                      value={item.text}
                      id="edit"
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
        <footer>
          <span>
            <strong>{numActive}</strong> {numActive === 1 ? 'item' : 'items'} left
          </span>

          <ul>
            <li>
              <button onClick={() => handleUpdateView('all')}>All</button>
            </li>
            <li>
              <button onClick={() => handleUpdateView('active')}>Active</button>
            </li>
            <li>
              <button onClick={() => handleUpdateView('completed')}>
                Completed
              </button>
            </li>
          </ul>

          {numCompleted && <button onClick={handleClear}>Clear completed</button>}
        </footer>
      )}
    </div>
  );
}

export default App;
