import React, { useEffect, useState } from "react";
import { Ellipsis, MessageCircle, Phone, Search, Send, User, VideoIcon } from "lucide-react";
import { getAllChat, getAllFriend, sendMessage, userStatusChange } from "../service/chatService";
import { useAppSelector } from "../../../redux/store";
import { io } from "socket.io-client";
import { formatTime } from "../helpers/timeformat";
import ProfileImageModal from "../components/ImageModal";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/react";

interface Message {
    id?: string;
    text: string;
    sender: string;
    time?: string;
    content?: string;
    sendingTime?: Date;
}

const Chat = () => {
    // Mock data for conversations and messages

    const { user } = useAppSelector(st => st.auth);
    const [allFriends, setAllFriends] = useState([]);
    const [messages, setMessages] = useState<Message[]>([]);
    console.log(allFriends);

    const [newMessage, setNewMessage] = useState("");
    const [currentFriend, setCurrentFriend] = useState<any>({});
    const [socket, setSocket] = useState<any>(null);

    const [prifileImageModal, setProfileImage] = useState({
        imageUrl: "",
        isModalOpen: false
    })

    const handleToggleProfileImge = (url: string) => {
        interface ProfileImage {
            imageUrl: string;
            isModalOpen: boolean;
        }

        setProfileImage((prev: ProfileImage) => ({
            ...prev,
            imageUrl: url,
            isModalOpen: !prev.isModalOpen
        }));
    }

    const [friendStatus, setFriendStatus] = useState({
        isTypeing: false,
    })
    // Initialize socket connection
    useEffect(() => {
        const newSocket = io("http://localhost:3000", {
            withCredentials: true,
        });
        setSocket(newSocket);

        // Socket event listeners
        newSocket.on("connect", async () => {
            await userStatusChange({ userStatus: true });
        });

        newSocket.on("receive_message", (message: Message) => {
            console.log(message);
            setMessages((prevMessages: any) => [...prevMessages, {
                text: message.content,
                sender: "reciver",
                sendingTime: message.sendingTime || new Date()
            }]);
        });

        newSocket.on("user_typing", (userId: string) => {
            // Handle typing indicator
            console.log(`User ${userId} is typing...`);
            // You can add a typing indicator state here
            setFriendStatus((pre: any) => ({ ...pre, isTypeing: true }));
        });

        newSocket.on("user_stop_typing", (userId: string) => {
            // Handle stop typing
            console.log(`User ${userId} stopped typing`);
            // You can remove the typing indicator here
            setFriendStatus((pre: any) => ({ ...pre, isTypeing: false }));

        });

        // Cleanup on component unmount
        return () => {
            if (currentFriend?.conversationId) {
                newSocket.emit("leave_conversation", currentFriend.conversationId);
            }
            newSocket.disconnect();
            (async () => {

                await userStatusChange({ userStatus: false })
            })()
        };
    }, []);

    // Join conversation when currentFriend changes
    useEffect(() => {
        if (socket && currentFriend?.conversationId) {
            socket.emit("join_conversation", currentFriend.conversationId);
        }
    }, [socket, currentFriend]);

    // Handle sending a new message
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentFriend || !newMessage.trim()) {
            return;
        }

        const payload = {
            conversationId: currentFriend.conversationId,
            senderId: user?._id,
            receiverId: currentFriend.friendDetails._id,
            content: newMessage.trim(),
            messageType: "text"
        };

        const newSendedMessage: Message = {
            text: newMessage,
            sender: "You",
            content: newMessage.trim(),
            sendingTime: new Date()
        };

        // Emit the message through socket
        socket.emit("send_message", {
            conversationId: currentFriend.conversationId,
            message: {
                ...payload,
                sender: "You"
            }
        });

        setMessages((prevMessages) => [...prevMessages, newSendedMessage]);
        await sendMessage(payload);
        setNewMessage("");
    };

    // Add typing indicator functionality
    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);

        if (socket && currentFriend?.conversationId) {
            socket.emit("typing", {
                conversationId: currentFriend.conversationId,
                userId: user?._id
            });

            // Stop typing indicator after 2 seconds of no input
            setTimeout(() => {
                socket.emit("stop_typing", {
                    conversationId: currentFriend.conversationId,
                    userId: user?._id
                });
            }, 2000);
        }
    };

    const handleOpenChat = (data: any) => {
        setCurrentFriend(data);
    }

    useEffect(() => {
        (async () => {
            //    const chat =  await getAllChat(user?._id);
            const allFriend = await getAllFriend();

            setAllFriends(allFriend.friends);

        })()
    }, [])
    useEffect(() => {
        (async () => {
            if (Object.entries(currentFriend).length > 0) {

                const res = await getAllChat({ conversationId: currentFriend?.conversationId });

                const updatedMessages = res.data.map((item: any) => {
                    if (item.sender === user?._id) {
                        item["sender"] = "You"
                    }
                    return item
                })

                setMessages(updatedMessages)
            }
        })()
    }, [currentFriend])



    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold flex items-center">
                        <MessageCircle className="mr-2" /> Chats
                    </h2>
                </div>
                <div className="p-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>
                <div className="overflow-y-auto">
                    {allFriends.map((friend: any) => (
                        <div
                            className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-200"
                            onClick={() => handleOpenChat(friend)}
                        >
                            <div className="flex items-center">
                                <div
                                    onClick={(e) => {
                                        console.log("clicked");
                                        e.stopPropagation();  // This prevents the event from bubbling up
                                        e.preventDefault();
                                        handleToggleProfileImge(friend.friendDetails?.profilePic);
                                    }}
                                    className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                    {friend.friendDetails?.profilePic ? (
                                        <img
                                            className="w-10 h-10 rounded-full object-cover"
                                            src={friend.friendDetails.profilePic}
                                            alt="Profile"
                                        />
                                    ) : (
                                        <User />
                                    )}
                                </div>

                                <div className="ml-3 flex-1">
                                    <h3 className="font-semibold">{friend.friendDetails.fullName}</h3>
                                    <p className="text-sm text-gray-600">{friend.friendDetails.status}</p>
                                </div>

                                <div className="flex items-center space-x-2">
                                    {friendStatus.isTypeing ? (
                                        <span className="text-sm text-gray-600">Typing...</span>
                                    ) : (
                                        <div className="flex items-center">
                                            <div className={`w-2 h-2 rounded-full ${friend.friendDetails.isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <span className="ml-2 text-sm text-gray-600">
                                                {friend.friendDetails.isOnline ? 'Online' : 'Offline'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="px-2 py-1 border-b border-gray-200 bg-white flex flex-row justify-between">
                    <div>

                        <h2 className="text-xl font-bold">{currentFriend?.friendDetails?.fullName}</h2>

                        <p className="text-sm text-gray-600">
                            {friendStatus?.isTypeing ? "Typing..." : (currentFriend?.friendDetails?.isOnline ? "Online" : "Offline")}
                        </p>
                    </div>
                    <div className="flex flex-row items-center p-1 rounded-lg space-y-1">
                        <Tooltip className="bg-[#dad8d8] rounded-xl" content="Make A Call Now" showArrow={true}>
                            <button
                                className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors group"
                            >
                                <Phone className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                            </button>
                        </Tooltip>
                        <Tooltip className="bg-[#dad8d8] rounded-xl" content="See More About the Friend" showArrow={true}>

                            <button
                                className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors group"
                            >
                                <Ellipsis className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                            </button>
                        </Tooltip>


                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {messages.length > 0 && messages?.map((message: any) => (
                        <div
                            key={message.id}
                            className={`mb-4 ${message.sender === "You" ? "text-right" : "text-left"
                                }`}
                        >
                            <div
                                className={`inline-block p-3 rounded-lg ${message.sender === "You"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                <p>{message.text}</p>
                                <p className="text-xs mt-1 text-gray-400">{formatTime(message.sendingTime)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input Box */}
                <div className="p-4 border-t border-gray-200 bg-white">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={handleTyping}
                            placeholder="Type a message..."
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
            <ProfileImageModal imageUrl={prifileImageModal.imageUrl} isOpen={prifileImageModal.isModalOpen} onOpenChange={() => handleToggleProfileImge("")} />
        </div >
    );
};

export default Chat;