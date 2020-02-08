import React from 'react';
import { render } from '@testing-library/react';

import { REMOVE_NOTIFICATION } from 'components/state-provider/notifications';
// import { mockUseStore } from 'tests/mock-use-store';
import { mockUseDispatch } from 'tests/mock-use-dispatch';
import { mockUseSelector } from 'tests/mock-use-selector';

import Notification, { NotificationDismissButton, NotificationOverlay } from './index';

import {
  LEVEL_INFO,
  LEVEL_ERROR,
  LEVEL_WARNING,
} from './style';

const defaultNotification = {
  id: '1',
  content: 'mock-content',
  dismissible: true,
  level: LEVEL_INFO,
};

describe('NotificationDismissButton', () => {
  it('renders', () => {
    const { asFragment } = render(<NotificationDismissButton onClick={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('executes a callback', () => {
    const clickHandler = jest.fn();
    const { getByTestId } = render(<NotificationDismissButton onClick={clickHandler} />);

    getByTestId('dismiss-button').click();

    expect(clickHandler).toHaveBeenCalled();
  });

  it('throws an error when onClick is missing', () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
    render(<NotificationDismissButton />);

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('NotificationOverlay', () => {
  it('renders', () => {
    const { asFragment } = render(<NotificationOverlay notification={defaultNotification} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders an error', () => {
    const notification = { ...defaultNotification, level: LEVEL_ERROR };
    const { asFragment } = render(<NotificationOverlay notification={notification} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a warning', () => {
    const notification = { ...defaultNotification, level: LEVEL_WARNING };
    const { asFragment } = render(<NotificationOverlay notification={notification} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a non-dismissible notification', () => {
    const notification = { ...defaultNotification, dismissible: false };
    const { queryByTestId } = render(<NotificationOverlay notification={notification} />);
    expect(queryByTestId('dismiss-button')).not.toBeInTheDocument();
  });

  it('renders a dismissible notification by default', () => {
    const { queryByTestId } = render(<NotificationOverlay notification={defaultNotification} />);
    expect(queryByTestId('dismiss-button')).toBeInTheDocument();
  });

  it('dismiss dispatches a REMOVE_NOTIFICATION action', () => {
    const { dispatch, restore } = mockUseDispatch();
    const { getByTestId } = render(<NotificationOverlay notification={defaultNotification} />);
    getByTestId('dismiss-button').click();

    expect(dispatch).toHaveBeenCalledWith({
      type: REMOVE_NOTIFICATION,
      payload: { notification: defaultNotification },
    });

    restore();
  });

  it('given dismissIn, dispatches a REMOVE_NOTIFICATION action', () => {
    jest.useFakeTimers();

    const { dispatch, restore } = mockUseDispatch();
    const notification = { ...defaultNotification, dismissIn: 5000 };

    render(<NotificationOverlay notification={notification} />);

    jest.advanceTimersByTime(4999);

    expect(dispatch).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);

    expect(dispatch).toHaveBeenCalled();

    restore();
  });
});

describe('Notification', () => {
  it('renders an empty notification list', () => {
    const { restore } = mockUseSelector({ notifications: { data: [] } });
    const { asFragment, queryByTestId, queryAllByTestId } = render(<Notification />);

    expect(asFragment()).toMatchSnapshot();
    expect(queryByTestId('notification-wrapper')).toBeInTheDocument();
    expect(queryAllByTestId('dismiss-button')).toHaveLength(0);

    restore();
  });

  it('renders a notification list', () => {
    const { restore } = mockUseSelector({
      notifications: {
        data: [
          { ...defaultNotification },
          { ...defaultNotification, id: '2' },
        ],
      },
    });
    const { asFragment, queryByTestId, queryAllByTestId } = render(<Notification />);

    expect(asFragment()).toMatchSnapshot();
    expect(queryByTestId('notification-wrapper')).toBeInTheDocument();
    expect(queryAllByTestId('dismiss-button')).not.toHaveLength(0);

    restore();
  });
});
