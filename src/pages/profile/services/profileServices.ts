import { axiosInstance } from "../../../config/axiosInstance";

export const mySelfService = async () => {
    try {
        const res = await axiosInstance.post("/user/me");
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getUserById = async (payload: any) => {
    try {
        const res = await axiosInstance.post(`/user/user-by-id`, payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}


export const findAllFriendRequests = async () => {
    try {
        const res = await axiosInstance.post(`/user/find-friend-request`);
        return res.data;
    } catch (error) {
        throw error;
    }
}


export const acceptFriendRequest = async (payload: any) => {
    try {
        const res = await axiosInstance.post(`/user/add-new-friend`, payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const makeFriendRequest = async (payload: any) => {
    try {
        const res = await axiosInstance.post(`/user/friend-request`, payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}


export const addFriendRequest = async (payload: any) => {
    try {
        const res = await axiosInstance.post(`/user/accept-frined-request`, payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}



export const cancelFriendRequest = async (payload: any) => {
    try {
        const res = await axiosInstance.post(`/user/cancel-friend-request`, payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}