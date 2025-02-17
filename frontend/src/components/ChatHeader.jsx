import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, unreadMessages } = useChatStore(); // Get unreadMessages from the store
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) {
    return (
      <div className="p-2.5 border-b border-base-300">
        <h3 className="font-medium">No chat selected</h3>
      </div>
    );
  }

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/images.png"}
                alt={selectedUser.fullName}
              />
              {onlineUsers.includes(selectedUser._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-base-100" />
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium flex items-center gap-2">
              {selectedUser.fullName}
              {/* Unread message badge */}
              {unreadMessages[selectedUser._id] > 0 && (
                <span className="badge badge-sm badge-primary">
                  {unreadMessages[selectedUser._id]}
                </span>
              )}
            </h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;