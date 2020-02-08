import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducers } from './reducers';

function reducer(state = initialState, action = {}) {
  if (reducers[action.reducer]) {
    return reducers[action.reducer](state, action);
  }

  return state;
}

const StoreContext = createContext(initialState);

/**
 * Main <StateProvide> Provider/Consumer Component
 * @param {[type]} options.children [description]
 */
export default function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

StateProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

/**
 * Hook to use the store and grab the { state, dispatch } object/method.
 * @return {Objet]} state + dispatch
 */
export const useStore = () => useContext(StoreContext);
