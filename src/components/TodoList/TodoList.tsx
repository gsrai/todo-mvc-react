import {
  Main,
  ToggleAllInput,
  ToggleAllLabel,
  TodoListContainer,
  TodoListItem,
  CheckboxLabel,
  TodoTextLabel,
  RemoveButton,
  EditInput
} from './styles';
import { TodoListProps } from './types';

export function TodoList(props: TodoListProps) {
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
    <Main>
      <ToggleAllInput
        id="toggle-all"
        type="checkbox"
        onChange={handleToggleAll}
        checked={allCompleted}
      />
      <ToggleAllLabel htmlFor="toggle-all">Mark all as complete</ToggleAllLabel>
      <TodoListContainer>
        {todos.map((todo, idx) => {
          return (
            <TodoListItem
              key={idx}
              currentlyEditing={currentlyEditing}
              todoId={todo.id}
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
                  <CheckboxLabel htmlFor={`checkbox_${idx}`}></CheckboxLabel>
                  <TodoTextLabel
                    onDoubleClick={() => handleDoubleClick(todo)}
                    completed={todo.completed}
                  >
                    {todo.text}
                  </TodoTextLabel>
                  <RemoveButton onClick={() => handleRemove(todo)}></RemoveButton>
                </div>
              </div>

              {currentlyEditing === todo.id && (
                <EditInput
                  defaultValue={todo.text}
                  id="edit"
                  currentlyEditing={currentlyEditing}
                  todoId={todo.id}
                  onKeyDown={handleEditing}
                  onBlur={handleEdit}
                  autoFocus
                />
              )}
            </TodoListItem>
          );
        })}
      </TodoListContainer>
    </Main>
  );
}
