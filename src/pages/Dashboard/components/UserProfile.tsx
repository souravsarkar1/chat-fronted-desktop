import { Card, CardBody } from "@heroui/react";
import { Avatar } from "@heroui/react";
import { Chip } from "@heroui/react";
import { Button } from "@heroui/react";
import { Mail, Users, Edit, Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal.tsx";

interface User {
    profilePic: string;
    fullName: string;
    username: string;
    email: string;
    friends: any[];
    lastSeen: string;
    isOnline: boolean;
    status: string;
    blockedUsers: any[];
    notifications: any[];
}

export default function UserProfile({ user }: { user: User }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <Card className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6 border border-gray-200">
            <CardBody className="flex flex-col items-center text-center space-y-4">
                {/* Avatar and Status */}
                <div className="relative w-32 h-32">
                    <Avatar
                        src={user.profilePic || "/placeholder.svg"}
                        alt={user.fullName}
                        className="w-32 h-32 rounded-full shadow-md border-4 border-white"
                    />
                    <div className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white ${user.isOnline ? "bg-green-500" : "bg-gray-400"}`} />
                </div>

                {/* User Info */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">{user.fullName}</h1>
                    <p className="text-gray-500 text-sm">@{user.username}</p>
                    <p className="text-gray-600 italic mt-2">"{user.status}"</p>
                </div>

                {/* Online Status */}
                <Chip className={`px-4 py-2 text-sm font-medium rounded-full ${user.isOnline ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                    {user.isOnline ? "Online" : `Last seen ${formatDistanceToNow(new Date(user.lastSeen), { addSuffix: true })}`}
                </Chip>

                {/* User Stats */}
                <div className="flex justify-center space-x-6 mt-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg shadow-sm">
                        <Mail className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600">{user.email.split("@")[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg shadow-sm">
                        <Users className="w-5 h-5 text-purple-500" />
                        <span className="text-gray-600">{user.friends.length} {user.friends.length === 1 ? "Friend" : "Friends"}</span>
                    </div>
                </div>

                {/* Edit Profile Button */}
                <Button color="primary" startContent={<Edit className="w-5 h-5" />} onClick={() => setIsEditModalOpen(true)}>
                    Edit Profile
                </Button>

                {/* Notifications */}
                <div className="w-full text-left mt-6">
                    <p className="text-lg font-semibold text-gray-700">Notifications</p>
                    <ul className="mt-2 space-y-2">
                        {user.notifications.map((notification) => (
                            <li key={notification._id} className={`flex items-center gap-3 p-3 rounded-md ${notification.read ? "bg-gray-100" : "bg-blue-100"}`}>
                                <Bell className="w-5 h-5 text-yellow-500" />
                                <span className="text-gray-700 font-medium">
                                    {notification.type === "friend_request"
                                        ? `Friend request from ${notification.from.fullName}`
                                        : notification.type === "message"
                                            ? `New message from ${notification.from.fullName}`
                                            : `Group invite from ${notification.from.fullName}`}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardBody>

            {/* Edit Profile Modal */}
            <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={user} />
        </Card>
    );
}
