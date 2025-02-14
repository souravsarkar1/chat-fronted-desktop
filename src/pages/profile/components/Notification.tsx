import { useEffect, useState } from "react";
import { addFriendRequest, findAllFriendRequests } from "../services/profileServices";
import { Button } from "@heroui/button";
import { toast } from "sonner";

const Notification = () => {
    const [allFriendRequest, setAllFriendRequest] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await findAllFriendRequests();
                const newRes = res.data.map((request: any) => {
                    return {
                        ...request,
                        isAcceptedLoading: false,
                        isRejectedLoading: false,
                    }
                })
                setAllFriendRequest(newRes);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAccept = async (id: string) => {
        setAllFriendRequest((prevRequests: any) => prevRequests.map((request: any) => {
            if (request._id === id) {
                return {
                    ...request,
                    isAcceptedLoading: true,
                    isRejectedLoading: false,
                };
            }
            return request;
        }))
        try {
            const res = await addFriendRequest({ friendId: id });
            if (res) {
                toast.success("Friend request accepted successfully");
                setAllFriendRequest((prevRequests: any) => prevRequests.filter((request: any) => request._id !== id));
            }
        } catch (error) {
            console.error("Error accepting friend request:", error);
            toast.error("Error accepting friend request");
        }
        finally {
            setAllFriendRequest((prevRequests: any) => prevRequests.map((request: any) => {
                if (request._id === id) {
                    return {
                        ...request,
                        isAcceptedLoading: false,
                        isRejectedLoading: false,
                    };
                }
                return request;
            }))
        }
    };

    const handleReject = (id: string) => {
        console.log("Rejected friend request with id:", id);
        // Add your logic to reject the friend request
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : (
                <ul className="space-y-4">
                    {allFriendRequest?.length === 0 ? (
                        <div className="text-center py-10">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Friend Requests</h2>
                            <p className="text-gray-500">You have no pending friend requests.</p>
                        </div>
                    ) : allFriendRequest.map((request: any) => (
                        <li
                            key={request._id}
                            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={request.profilePic}
                                    alt={request.username}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-300"
                                />
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">{request.fullName}</p>
                                    <p className="text-sm text-gray-500">@{request.username}</p>
                                    <p className="text-sm text-gray-600 italic">"{request.status}"</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    onPress={() => handleAccept(request._id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                                >
                                    {request.isAcceptedLoading ? "Accepting..." : "Accept"}
                                </Button>
                                <Button
                                    onPress={() => handleReject(request._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                                >
                                    Reject
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notification;