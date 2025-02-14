import { axiosInstance } from "../../../config/axiosInstance"

export const getAllFriend = async () => {
    try {
        const res = await axiosInstance.post(`/user/get-friend`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error;
    }
}


export const getAllNotFriend = async () => {
    try {
        const res = await axiosInstance.post(`/user/get-all-suggested-friends`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error;
    }
}

export const getAllSendFriendRequest = async () => {
    try {
        const res = await axiosInstance.post(`/user/get-all-sened-friend-request-by-me`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error;
    }
}