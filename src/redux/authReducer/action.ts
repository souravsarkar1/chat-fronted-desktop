import axios from "axios";
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from "./actionTypes"
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