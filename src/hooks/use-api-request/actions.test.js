import {
  FETCHING,
  SUCCESS,
  ERROR,
  fetching,
  success,
  error,
} from './actions';

const MOCK_OBJECT = { key: 'value' };

/**
 * Actions
 */
it('returns an action for fetching', () => {
  const action = fetching();

  expect(action.type).toBe(FETCHING);
});

it('returns an action for success', () => {
  const action = success(MOCK_OBJECT);

  expect(action.type).toBe(SUCCESS);
  expect(action.response).toBe(MOCK_OBJECT);
});

it('returns an action for error', () => {
  const action = error(MOCK_OBJECT);

  expect(action.type).toBe(ERROR);
  expect(action.response).toBe(MOCK_OBJECT);
});
