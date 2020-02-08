import moxios from 'moxios';
import { renderHook, act } from '@testing-library/react-hooks';

import { FETCHING, SUCCESS, ERROR } from './actions';
import { useApiRequest } from './index';

const MOCK_DATA = { data: 'mock-data' };

let state;
let makeRequest;

beforeEach(() => {
  moxios.install();

  renderHook(() => {
    [state, makeRequest] = useApiRequest('/test');
  });
});

afterEach(() => {
  moxios.uninstall();
});

it('returns a state and a callback', () => {
  expect(Object.keys(state)).toStrictEqual(['status', 'response']);
  expect(state.status).toBeNull();
  expect(state.response).toBeNull();
  expect(makeRequest).toBeType('function');
});

it('returns an error', async () => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.reject({ status: 422, response: MOCK_DATA });
  });

  await act(() => makeRequest());

  expect(state.response).toBe(MOCK_DATA);
  expect(state.status).toBe(ERROR);
});

it('returns a sucessful response', async () => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({ status: 200, response: MOCK_DATA });
  });

  await act(() => makeRequest());

  expect(state.response.data).toBe(MOCK_DATA);
  expect(state.status).toBe(SUCCESS);
});

it('returns a flag indicating the loading state', () => {
  expect(state.status).toBeNull();

  act(() => {
    makeRequest();
  });

  expect(state.status).toBe(FETCHING);
  expect(state.response).toBeNull();
});
