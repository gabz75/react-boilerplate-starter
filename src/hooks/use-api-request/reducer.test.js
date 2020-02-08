import { reducer, initialState } from './reducer';
import { fetching, success, error } from './actions';

const MOCK_OBJECT = { key: 'value' };

describe('initialState', () => {
  it('has a status and response', () => {
    expect(initialState.status).toBeNull();
    expect(initialState.response).toBeNull();
  });
});

describe('reducer', () => {
  it('returns the initialState', () => {
    const state = reducer();

    expect(state).toBe(initialState);
    expect(state.status).toBeNull();
    expect(state.response).toBeNull();
  });

  it('fetches', () => {
    const state = reducer(fetching());

    expect(state.status).not.toBeNull();
    expect(state.response).not.toBeNull();
  });

  it('returns a successful response', () => {
    const state = reducer(success(MOCK_OBJECT));

    expect(state.status).not.toBeNull();
    expect(state.response).toBe(MOCK_OBJECT);
  });

  it('returns an error', () => {
    const state = reducer(error(MOCK_OBJECT));

    expect(state.status).not.toBeNull();
    expect(state.response).toBe(MOCK_OBJECT);
  });
});
