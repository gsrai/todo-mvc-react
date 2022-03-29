import { createContext, ReactNode, useReducer, useContext } from 'react';
import { initialState, reducer } from '../reducers/todoReducer';
import { Action, State } from '../types';

type StoreProviderProps = {
  children: ReactNode;
};

type StoreContext = {
  dispatch: React.Dispatch<Action>;
  state: State;
};

const store = createContext<StoreContext>({
  state: initialState,
  dispatch: () => {
    throw new Error('dispatch called before store context has been initialised');
  }
});

export const useStore = () => useContext<StoreContext>(store);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <store.Provider value={{ state, dispatch }}>{children}</store.Provider>;
};
