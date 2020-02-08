import { useReducer, useCallback } from 'react';
import axios from 'axios';
import { reducer, initialState } from './reducer';
import { fetching, success, error } from './actions';

const DEBUG = false;

/* eslint-disable no-console */

export const useApiRequest = (endpoint, { verb = 'get', params = {} } = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const makeRequest = useCallback(async (_params = {}) => {
    // console.log('>params', params);
    if (DEBUG) console.log('>_params', _params);
    const mergedParams = { ...params, ..._params };
    if (DEBUG) console.log(`> query [${verb}] ${endpoint}`, mergedParams);
    dispatch(fetching());
    try {
      const response = await axios[verb](endpoint, mergedParams);
      if (DEBUG) console.log('>response', response);
      dispatch(success(response));
    } catch (e) {
      if (DEBUG) console.log('>error', e.response);
      dispatch(error(e.response));
    }
  }, [endpoint, verb, params]);

  return [state, makeRequest];
};

export default useApiRequest;
