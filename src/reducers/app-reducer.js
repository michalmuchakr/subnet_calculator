const appInitialState = {
  authToken: null,
  loading: null,
  laodingID: '',
  userAuthenticated: false
};

export const appReducer = (state, action) => {
  if (typeof action.type === 'function') {
    return action.type(state, action);
  }

  return state;
};

export default {
  appInitialState
};