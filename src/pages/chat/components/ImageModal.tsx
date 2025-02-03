import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { User, Download } from "lucide-react";

export default function ProfileImageModal({
    imageUrl,
    isOpen,
    onOpenChange
}: {
    imageUrl: string;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}) {
    const downloadImage = async () => {
        try {
            // Fetch the image
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            // Create a temporary link
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);

            // Extract filename from URL or use default
            const filename = imageUrl.split('/').pop() || 'profile-image.jpg';
            link.download = filename;

            // Trigger download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading image:', error);
            // You might want to add proper error handling here
            alert('Failed to download image. Please try again.');
        }
    };

    return (
        <Modal
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 px-6 py-4 border-b border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800">Profile Image</h3>
                        </ModalHeader>

                        <ModalBody className="px-6 py-8">
                            <div className="flex items-center justify-center">
                                {imageUrl ? (
                                    <div className="relative w-64 h-64 rounded-full overflow-hidden ring-4 ring-indigo-100 shadow-lg">
                                        <img
                                            src={imageUrl}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-64 h-64 rounded-full bg-gray-100 flex items-center justify-center ring-4 ring-indigo-100">
                                        <User size={64} className="text-gray-400" />
                                    </div>
                                )}
                            </div>
                        </ModalBody>

                        <ModalFooter className="px-6 py-4 border-t border-gray-100 flex gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
                            >
                                Close
                            </button>
                            {imageUrl && (
                                <button
                                    onClick={downloadImage}
                                    className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-colors flex items-center gap-2"
                                >
                                    <Download size={18} />
                                    Download
                                </button>
                            )}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}