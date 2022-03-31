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
import Footer from './components/Footer';
import Header from './components/Header';
import TodoList from './components/TodoList';

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

  const handleToggleAll = (e: SyntheticEvent<HTMLInputElement>) => {
    dispatch(toggleCompleted(e.currentTarget.checked));
  };

  const handleClear = () => {
    dispatch(clearAllCompleted());
  };

  return (
    <div className="bg-white mt-32 mb-10 relative shadow-[0_2px_4px_0_rgba(0,0,0,0.2),_0_25px_50px_0_rgba(0,0,0,0.1)] max-w-xl min-w-fit my-0 mx-auto">
      <Header handleNewTodo={handleNewTodo} />
      {items.length > 0 && (
        <TodoList
          currentlyEditing={editing}
          allCompleted={numCompleted === items.length}
          todos={filteredItems}
          handleToggleAll={handleToggleAll}
          handleToggle={({ id }: Todo) => dispatch(toggleTodo(id))}
          handleEdit={handleEditTodo}
          handleEditing={handleEditingTodo}
          handleRemove={({ id }: Todo) => dispatch(removeTodo(id))}
          handleDoubleClick={({ id }: Todo) => setEditing(id)}
        />
      )}
      {items.length > 0 && (
        <Footer
          numActive={numActive}
          currentFilter={currentFilter}
          hasSomeCompleted={!!numCompleted}
          handleUpdateView={handleUpdateView}
          handleClear={handleClear}
        />
      )}
    </div>
  );
}

export default App;
