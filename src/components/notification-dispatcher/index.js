import React from 'react';

import { useNotification } from 'components/notification';

function NotificationDispatcher() {
  // hooks
  const { notify } = useNotification();

  const onClick = () => {
    notify('test');
  };

  return (
    <button type="button" onClick={onClick}>Add notification</button>
  );
}

export default NotificationDispatcher;
