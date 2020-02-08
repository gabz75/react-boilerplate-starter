import notificationReducer, {
  initialState as notificationsInitialState,
} from './notifications';

export const initialState = {
  notifications: notificationsInitialState,
};

export const reducers = {
  notifications: notificationReducer,
};
