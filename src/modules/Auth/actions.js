import types from "./types";

export const setUser = (user, token) => ({
  type: types.SET_USER,
  payload: { user, token },
});
export const signOut = (data) => ({
  type: types.SIGN_OUT,
  payload: data,
});
