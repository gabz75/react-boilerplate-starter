export const initialState = {
  data: [],
};

const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export function addNotification(notification) {
  return {
    reducer: 'notifications',
    type: ADD_NOTIFICATION,
    payload: {
      notification,
    },
  };
}

export function removeNotification(notification) {
  return {
    reducer: 'notifications',
    type: REMOVE_NOTIFICATION,
    payload: {
      notification,
    },
  };
}

function reduceAddNotification(state, action = {}) {
  const { notification } = action.payload;
  const { data } = state.notifications;
  data.push(notification);
  return { ...state, data: [...data] };
}

function reduceRemoveNotification(state, action = {}) {
  const { notification } = action.payload;
  const { data } = state.notifications;
  const newData = data.filter((n) => n.id !== notification.id);
  return { ...state, notifications: { data: newData } };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return reduceAddNotification(state, action);
    case REMOVE_NOTIFICATION:
      return reduceRemoveNotification(state, action);
    default:
      return state;
  }
}
