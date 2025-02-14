import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { Button, Input, Textarea } from "@heroui/react";
import { useState } from "react";

interface User {
    profilePic: string;
    fullName: string;
    username: string;
    email: string;
    status: string;
}

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
}

export default function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
    const [formData, setFormData] = useState({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        status: user.status,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated user data:", formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="bg-white rounded-2xl shadow-lg w-full max-w-md">
                <ModalHeader className="p-5 border-b border-gray-200 text-lg font-semibold text-gray-800">
                    Edit Profile
                </ModalHeader>
                <ModalBody className="p-5">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label htmlFor="fullName">Full Name</label>
                        <Input name="fullName" value={formData.fullName} onChange={handleChange} />
                        <label htmlFor="username">User Name</label>
                        <Input name="username" value={formData.username} onChange={handleChange} />
                        <label htmlFor="email">Email</label>
                        <Input name="email" type="email" value={formData.email} onChange={handleChange} />
                        <label htmlFor="status">Status</label>
                        <Textarea name="status" value={formData.status} onChange={handleChange} />
                    </form>
                </ModalBody>
                <ModalFooter className="p-5 border-t border-gray-200 flex justify-end space-x-3">
                    <Button className="bg-red-300 rounded-full" variant="light" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="bg-blue-300 rounded-full" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
