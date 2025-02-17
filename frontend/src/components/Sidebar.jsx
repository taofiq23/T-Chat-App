import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : [...users].sort((a, b) => {
        const aIsOnline = onlineUsers.includes(a._id);
        const bIsOnline = onlineUsers.includes(b._id);
        return bIsOnline - aIsOnline; // Online users come first
      });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-72 border-r border-base-300 flex flex-col items-center transition-all duration-200 bg-gradient-to-b from-base-100/50 to-base-200/30">
      {/* Contacts Header */}
      <div className="w-full p-4 border-b border-base-300 relative group">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="relative inline-block">
            <Users className="size-7 text-primary transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -top-2 -right-2 bg-secondary text-secondary-content rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {onlineUsers.length - 1}
            </span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mt-2 backdrop-blur-sm">
            Active Connections
          </span>
          <span className="text-xs text-neutral-content/60">
            Online Now
          </span>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Contacts List */}
      <div className="flex-1 w-full p-2 space-y-2 overflow-y-auto custom-scrollbar">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 rounded-xl transition-all duration-200
              hover:bg-base-300/30 hover:translate-x-2 group
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/images.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-base-100" />
              )}
            </div>
            <div className="text-left min-w-0">
              <h3 className="font-medium text-neutral-content">{user.fullName}</h3>
              <p className="text-xs text-neutral-content/60 flex items-center gap-1">
                {onlineUsers.includes(user._id) ? (
                  <span className="animate-pulse">🟢</span>
                ) : (
                  <span>⚫</span>
                )}
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>

      {/* Online filter toggle */}
      <div className="mt-4 flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm"
          />
          <span className="text-sm">Show Active User</span>
        </label>
      </div>
    </aside>
  );
};

export default Sidebar;
