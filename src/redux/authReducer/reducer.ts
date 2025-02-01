import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./actionTypes";

type AuthState = {
    isAuth: boolean;
    token: string | null;
    user: any;
    error: any;
    isLoadingLogin: boolean;
    isErrorLogin: boolean;
    isLoadingSignup: boolean;
    isErrorSignup: boolean;
};

type AuthAction = {
    type: string;
    payload?: any;
};

const initialState: AuthState = {
    isAuth: false,
    token: null,
    user: null,
    error: null,
    isLoadingLogin: false,
    isErrorLogin: false,
    isLoadingSignup: false,
    isErrorSignup: false,
};

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                isLoadingLogin: true,
                isErrorLogin: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoadingLogin: false,
                isErrorLogin: false,
                isAuth: true,
                token: action.payload?.token,
                user: action.payload?.user
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoadingLogin: false,
                isErrorLogin: true,
                error: action.payload,
            };
        case SIGNUP_START:
            return {
                ...state,
                isLoadingSignup: true,
                isErrorSignup: false,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoadingSignup: false,
                isErrorSignup: false,
            };
        case SIGNUP_FAILURE:
            return {
                ...state,
                isLoadingSignup: false,
                isErrorSignup: true,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuth: false,
                token: null,
                user: null,
            };
        default:
            return state;
    }
};
