import types from "./types";

const initialState = {
  logged: false,
  user_info: null,
  token: null,
};

const storeDataOnLocalStorage = async (user_info, token, logged) => {
  try {
    localStorage.setItem("user_info", JSON.stringify(user_info));
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("logged", JSON.stringify(logged));
  } catch (error) {
    console.log(error);
  }
};

const getDataFromLocalStorage = async () => {
  try {
    let res1 = localStorage.getItem("user_info");
    let res2 = localStorage.getItem("token");
    let res3 = localStorage.getItem("logged");

    if (res1 != null) {
      initialState.user_info = JSON.parse(res1);
    } else {
      initialState.user_info = null;
    }

    if (res2 != null) {
      initialState.token = JSON.parse(res2);
    } else {
      initialState.token = null;
    }

    if (res3 != null) {
      initialState.logged = JSON.parse(res3);
    } else {
      initialState.logged = false;
    }
  } catch (error) {
    console.log(error);
  }
};

getDataFromLocalStorage();

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
