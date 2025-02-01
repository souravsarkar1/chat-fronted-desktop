import { axiosInstance } from "../../../config/axiosInstance"

export const getAllChat = async (payload: any) => {
    try {
        const res = await axiosInstance.post(`/conversation/get-all-message`, payload);
        return res.data;
    } catch (error) {
        throw error;
    }
}


export const getAllUsers = async () => {
    try {
        const res = await axiosInstance.post("/user/get-all");
        console.log(res);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const getAllFriend = async () => {
    try {
        const res = await axiosInstance.post(`/user/get-all-friend`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const sendMessage = async (payload: any) => {
    try {
        const res = await axiosInstance.post(`/conversation/add-new-message`, payload);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}