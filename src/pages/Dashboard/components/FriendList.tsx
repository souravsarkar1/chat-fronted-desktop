import { Tooltip } from "@heroui/react";
// import { formatDistanceToNow } from "date-fns";
import { MessageCircle, MessageCircleCodeIcon } from "lucide-react";

interface Friend {
    friendDetails: {
        _id: string;
        username: string;
        fullName: string;
        profilePic: string;
        status: string;
        isOnline: boolean;
        lastSeen: string;
    };
    lastMessage: {
        text: string;
        sendingTime: string;
    };
}

interface FriendListProps {
    friends: Friend[];
}

export default function FriendList({ friends }: FriendListProps) {
    return (
        <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {friends.map((friend) => (
                    <div
                        key={friend.friendDetails._id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="relative">
                            <img
                                src={friend.friendDetails.profilePic || "/placeholder.svg"}
                                alt={friend.friendDetails.fullName}
                                className="w-full h-64 object-fit"
                            />
                            <div
                                className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${friend.friendDetails.isOnline ? "bg-green-400" : "bg-gray-300"
                                    }`}
                            />
                        </div>
                        <div className="p-6 flex flex-row items-center justify-between">
                            <div>

                                <h1 className="text-2xl font-semibold text-gray-900 truncate">
                                    {friend.friendDetails.fullName}
                                </h1>
                                <p className="text-lg text-gray-600 truncate">@{friend.friendDetails.username}</p>
                            </div>
                            <div>
                                <Tooltip className="bg-blue-500 text-white rounded-full p-2" content="Send Message" >
                                    <MessageCircleCodeIcon />
                                </Tooltip>

                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-100 flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-700">
                                <MessageCircle className="w-5 h-5 mr-2 text-gray-500" />
                                <span className="truncate">{friend?.lastMessage?.text}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                                {/* {formatDistanceToNow(new Date(friend?.lastMessage?.sendingTime), { addSuffix: true })} */}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}