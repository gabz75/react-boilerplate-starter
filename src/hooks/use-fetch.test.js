import { renderHook, act } from '@testing-library/react-hooks';
import fetchMock from 'fetch-mock';
import { useFetch } from './use-fetch';

const MOCK_DATA = { data: 'mock-data' };

let state;
let makeRequest;

beforeEach(() => {
  renderHook(() => {
    [state, makeRequest] = useFetch('/test');
  });
});

afterEach(() => {
  fetchMock.restore();
});

it('returns a object with json, loading, error keys', () => {
  expect(Object.keys(state)).toStrictEqual(['json', 'loading', 'error']);
  expect(state.json).toBeUndefined();
  expect(state.loading).toBeUndefined();
  expect(state.error).toBeUndefined();
  expect(makeRequest).toBeType('function');
});

it('returns an error', async () => {
  fetchMock.getOnce('/test', 500);

  await act(() => makeRequest());

  expect(state.loading).toBe(false);
  expect(state.error).toBeDefined();
  expect(state.error.message).toBe('invalid json response body at /test reason: Unexpected end of JSON input');
});

it('returns a json object', async () => {
  fetchMock.getOnce('/test', MOCK_DATA);

  await act(() => makeRequest());

  expect(state.loading).toBe(false);
  expect(state.json).toBeDefined();
  expect(state.json.data).toBe('mock-data');
});

it('sets a loader', () => {
  fetchMock.getOnce('/test', MOCK_DATA, { delay: 1 });

  act(() => {
    makeRequest();
  });

  expect(state.loading).toBe(true);
});
