/**
 * Initial State
 */

const initialState = {};

/**
 * Actions
 */

export const ACTION = 'ACTION';

export const action = (object) => ({
  type: ACTION,
  payload: {
    object,
  },
});

/**
 * Reducers for each action
 */

function reduceAction(state, action) {
  return state;
}

/**
 * Reducer
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION:
      return reduceAction(state, action);
    default:
      return state;
  }
}
