import React, {createContext, useReducer, useContext } from 'react';

/**
 * Create a new context for global state.
 */
const StateContext = createContext();

export const StateProvider = ({
  reducer,
  initialState,
  children
}) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

/**
 * Shorthand to consume a context. Use this in components that need access to the
 * dispatch method or a pointer to state.
 */
export default () => useContext(StateContext);