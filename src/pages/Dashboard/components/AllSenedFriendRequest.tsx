
import { Tooltip } from "@heroui/react";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, UserPlus } from "lucide-react";
import { cancelFriendRequest } from "../../profile/services/profileServices";
import { toast } from "sonner";

interface Friend {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  profilePic: string;
  status: string;
  isOnline: boolean;
  lastSeen: string;
  friends: any[];
  groups: any[];
  blockedUsers: any[];
  notifications: any[];
  createdAt: string;
  updatedAt: string;
}

interface FriendListProps {
  friends: Friend[];
}

export default function AllSenedFriendRequest({ friends }: FriendListProps) {

  const handleCancelFriendRequest = async (friend_id: string) => {
    try {
      const res = await cancelFriendRequest({ friendId: friend_id });
      console.log(res);
      if (res) {
        toast.success("Friend request cancel successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending friend request");
    }
  }
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {friends.map((friend) => (
          <div
            key={friend._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-200"
          >
            <div className="relative">
              <img
                src={friend.profilePic || "/placeholder.svg"}
                alt={friend.fullName}
                className="w-full h-64 object-cover"
              />
              <div
                className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${friend.isOnline ? "bg-green-400" : "bg-gray-300"
                  }`}
              />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 truncate">
                    {friend.fullName}
                  </h3>
                  <p className="text-lg text-gray-600 truncate">
                    @{friend.username}
                  </p>
                </div>
                <Tooltip
                  content="Add Friend"
                  placement="top"
                  className="bg-blue-500 text-white rounded-full p-2"
                >
                  <button onClick={() => handleCancelFriendRequest(friend._id)} className="p-2 rounded-full hover:bg-gray-100">
                    <UserPlus className="w-5 h-5" />
                  </button>
                </Tooltip>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-100">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-700 max-w-[70%]">
                  <MessageCircle className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0" />
                  <span className="truncate">
                    {friend.status}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(friend.lastSeen), {
                    addSuffix: true
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}