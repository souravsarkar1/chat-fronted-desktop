import { Card, CardBody } from "@heroui/react";
import { Chip } from "@heroui/react";
import { Button } from "@heroui/react";
import { Edit, Bell, MessageCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import EditProfileModal from "../../Dashboard/components/EditProfileModal.tsx";
import { mySelfService } from "../services/profileServices.ts";
import { Link } from "react-router-dom";

export default function UserProfile() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [user, setMySelf] = useState<any>({});
    const [_, setNotificationModalOpen] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                const res = await mySelfService();
                setMySelf(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        })();
    }, []);
    console.log(user)
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Card className="max-w-9xl mx-auto">
                <CardBody className="p-6">
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={user.profilePic}
                            alt={user.fullName}
                            className="border-4 border-blue-500 rounded-full w-24 h-24"
                        />
                        <h1 className="text-3xl font-semibold text-gray-800">{user.fullName}</h1>
                        <Chip className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                            {user.isOnline ? "Online" : "Offline"}
                        </Chip>
                        <p className="text-gray-600 text-center">{user.status}</p>
                        <div className="flex space-x-4">
                            <Button
                                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                onClick={() => setIsEditModalOpen(true)}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                            <Button as={Link} to={"/notification"} onPress={() => setNotificationModalOpen(true)} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                <Bell className="mr-2 h-4 w-4" />
                                Notifications
                            </Button>
                            <Button as={Link} to={"/chat"} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                <MessageCircleIcon className="mr-2 h-4 w-4" />
                                Message
                            </Button>
                            <Button as={Link} to={"/dashboard?tab=friends"} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                <MessageCircleIcon className="mr-2 h-4 w-4" />
                                Friends
                            </Button>
                            <Button as={Link} to={"/dashboard?tab=suggested"} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                <MessageCircleIcon className="mr-2 h-4 w-4" />
                                Suggested Friends
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        {/* <div className="flex items-center space-x-4">
                            <Mail className="h-6 w-6 text-blue-500" />
                            <p className="text-gray-700">{user.email}</p>
                        </div> */}

                    </div>
                </CardBody>
            </Card>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={user}
            />
            {/* <NotificationModal notifications={user?.notifications} isOpen={notificationModalOpen} onClose={() => setNotificationModalOpen(false)} /> */}
        </div>
    );
}