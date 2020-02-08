import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import { useStore } from 'components/state-provider';
import { addNotification, removeNotification } from 'components/state-provider/reducers/notifications';
import {
  Wrapper,
  DismissOverlay,
  NotificationPopup,
  LEVEL_INFO,
  LEVEL_ERROR,
  LEVEL_WARNING,
} from './style';

/**
 * useNotification Hook add notifications.
 *
 * @return {Object} various notifications with different notifications level.
 */
export const useNotification = () => {
  const { dispatch } = useStore();
  const defaultConfig = {
    dismissible: true,
  };

  const notifyCallback = (level, content, notificationConfig) => {
    const config = {
      ...defaultConfig, id: uniqueId(), content, ...notificationConfig, level,
    };
    dispatch(addNotification(config));
  };

  const notify = useCallback(notifyCallback.bind(this, LEVEL_INFO), [dispatch, defaultConfig]);
  const warning = useCallback(notifyCallback.bind(this, LEVEL_WARNING), [dispatch, defaultConfig]);
  const error = useCallback(notifyCallback.bind(this, LEVEL_ERROR), [dispatch, defaultConfig]);

  return { notify, warning, error };
};

/**
 * Dismiss button component
 *
 * @param {Function} options.onClick
 */
export function NotificationDismissButton({ onClick }) {
  return (
    <DismissOverlay data-testid="dismiss-button" onClick={onClick}>
      X
    </DismissOverlay>
  );
}

NotificationDismissButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

/**
 * UI element for a single Notification.
 *
 * @param {Object} options.notification
 */
export function NotificationOverlay({ notification }) {
  const { dispatch } = useStore();

  const onDismiss = () => {
    dispatch(removeNotification(notification));
  };

  if (notification.dismissIn) {
    setTimeout(onDismiss, notification.dismissIn);
  }

  return (
    <NotificationPopup level={notification.level}>
      {notification.dismissible && <NotificationDismissButton onClick={onDismiss} />}
      {notification.content}
    </NotificationPopup>
  );
}

NotificationOverlay.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string,
    level: PropTypes.string,
    content: PropTypes.string,
    dismissIn: PropTypes.number,
    dismissible: PropTypes.bool,
  }).isRequired,
};

/**
 * Notification component, reads notifications from the state and renders <NotificationOverlay />.
 */
function Notification() {
  const { state } = useStore();
  const { notifications } = state;

  return (
    <Wrapper data-testid="notification-wrapper">
      {
        notifications.data.map((notification) => (
          <NotificationOverlay
            key={notification.id}
            notification={notification}
          />
        ))
      }
    </Wrapper>
  );
}

export default Notification;
