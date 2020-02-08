const prefix = 'useApiRequest';

export const FETCHING = `${prefix}FETCHING`;
export const SUCCESS = `${prefix}SUCCESS`;
export const ERROR = `${prefix}ERROR`;

export const fetching = () => ({ type: FETCHING });
export const success = (response) => ({ type: SUCCESS, response });
export const error = (response) => ({ type: ERROR, response });
