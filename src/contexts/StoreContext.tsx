import { createContext, ReactNode, useReducer, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialState, reducer } from '../reducers/todoReducer';
import { Action, State } from '../types';

type StoreProviderProps = {
  children: ReactNode;
};

type StoreContext = {
  dispatch: React.Dispatch<Action>;
  state: State;
};

const LOCAL_STORAGE_KEY = 'todo-mvc-state';

const store = createContext<StoreContext>({
  state: initialState,
  dispatch: () => {
    throw new Error('dispatch called before store context has been initialised');
  }
});

export const useStore = () => useContext<StoreContext>(store);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [storedState, persistToLocalStorage] = useLocalStorage<State>(
    LOCAL_STORAGE_KEY,
    initialState
  );
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (_default) => storedState || _default
  );

  useEffect(() => {
    persistToLocalStorage(state);
  }, [state.todos, state.filter]);

  return <store.Provider value={{ state, dispatch }}>{children}</store.Provider>;
};
