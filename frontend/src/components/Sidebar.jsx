import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const { 
    getUsers, 
    users, 
    selectedUser, 
    setSelectedUser, 
    isUsersLoading, 
    unreadMessages,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : [...users].sort((a, b) => {
        const aIsOnline = onlineUsers.includes(a._id);
        const bIsOnline = onlineUsers.includes(b._id);
        return bIsOnline - aIsOnline;
      });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className={`h-full ${isExpanded ? 'w-72' : 'w-30'} border-r border-base-300 flex flex-col items-center transition-all duration-300 relative`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3.5 top-4 bg-base-100 rounded-full p-1.5 shadow-lg border border-base-300 z-10 hover:bg-base-200 transition-colors"
      >
        {isExpanded ? (
          <ChevronLeft className="size-5" />
        ) : (
          <ChevronRight className="size-5" />
        )}
      </button>

      {/* Contacts Header */}
      <div className="w-full p-4 border-b border-base-300 relative group">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="relative inline-block">
            <Users className={`size-7 text-primary transition-transform ${isExpanded ? '' : 'mx-auto'}`} />
            {isExpanded && (
              <span className="absolute -top-2 -right-2 bg-secondary text-secondary-content rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {onlineUsers.length - 1}
              </span>
            )}
          </div>
          {isExpanded && (
            <>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent hidden lg:block mt-2 backdrop-blur-sm">
                Active Connections
              </span>
              <span className="text-xs text-neutral-content/60 hidden lg:block">
                Online Now
              </span>
            </>
          )}
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 w-full p-2 space-y-2 overflow-y-auto custom-scrollbar">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-2 flex items-center justify-center lg:justify-start
              rounded-xl transition-all duration-200
              ${selectedUser?._id === user._id ? "bg-base-300" : ""}
              ${isExpanded ? 'hover:translate-x-2' : ''}
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
              {unreadMessages[user._id] > 0 && (
                <span className="absolute top-0 right-0 badge bg-red-500 text-white text-xs px-1.5 py-0.5">
                  {unreadMessages[user._id]}
                </span>
              )}
            </div>
            {isExpanded && (
              <div className="hidden lg:block text-left min-w-0 ml-3">
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
            )}
          </button>
        ))}

        {filteredUsers.length === 0 && isExpanded && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>

      {/* Online filter toggle */}
      {isExpanded && (
        <div className="mt-4 hidden lg:flex items-center gap-2 px-2">
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
      )}
    </aside>
  );
};

export default Sidebar;