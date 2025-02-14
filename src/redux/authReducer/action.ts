import axios from "axios";
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_START, SIGNUP_SUCCESS } from "./actionTypes"
import { API } from "../../config/config";
import { Dispatch } from 'redux';

export const loginFn = (payload: any) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: LOGIN_START });
        const res = await axios.post(`${API}/user/login`, payload);

        console.log(res.data);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: LOGIN_FAILURE, payload: error });
    }
}


export const signupFn = (payload: any) => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: SIGNUP_START });

        // Make the API call
        const res = await axios.post(`${API}/user/register`, payload);

        // Log the response data (optional)
        console.log(res.data);

        // Dispatch success action
        dispatch({ type: SIGNUP_SUCCESS, payload: res.data });

        // Return a success response
        return { success: true, data: res.data };
    } catch (error: any) {
        console.log(error);

        // Dispatch failure action
        dispatch({ type: SIGNUP_FAILURE, payload: error });

        // Return an error response
        return { success: false, message: error.response?.data?.message || "Signup failed. Please try again." };
    }
};

