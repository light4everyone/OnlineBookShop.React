import { on, reducer } from "ts-action";
import { fetchCurrentUserFailure, loginUserFailure, loginUserRequest, loginUserSuccess, logoutUserSuccess } from "../actions/auth";

export interface AuthStore {
  token: string | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isFetchingCurrentUser: boolean;
  errors: boolean;
}

const initialState: AuthStore = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false,
  isFetchingCurrentUser: true,
  errors: false
};

export default reducer(
  initialState,
  on(loginUserSuccess, (state, { payload }) => ({
    ...state,
    token: payload?.token,
    isAuthenticated: true,
    isAuthenticating: false,
    isFetchingCurrentUser: false
  })),
  on(loginUserFailure, (state, ) => ({
    ...state,
    errors: true
  })),
  on(loginUserRequest, (state) => ({
    ...state,
    errors: false,
    isAuthenticating: true
  })),
  on(logoutUserSuccess, (state) => ({
    ...state,
    isAuthenticated: false,
    token: null
  })),
  on(fetchCurrentUserFailure, (state) => ({
    ...state,
    isFetchingCurrentUser: false
  }))
)

