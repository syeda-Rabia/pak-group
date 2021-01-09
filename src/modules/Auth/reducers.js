import types from "./types";

const initialState = {
  logged: false,
  user_info: null,
  token: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        logged: true,
        user_info: action.payload.user,
        token: action.payload.token,
      };
    case types.SIGN_OUT:
      return {
        ...state,
        logged: false,
        user_info: initialState,
        token: null,
      };

    default:
      return state;
  }
}
