import React from 'react';

import StateProvider from 'components/state-provider';
import Notification from 'components/notification';
import NotificationDispatcher from 'components/notification-dispatcher';

function App() {
  return (
    <StateProvider>
      <>
        <Notification />
        <NotificationDispatcher />
      </>
    </StateProvider>
  );
}

export default App;
