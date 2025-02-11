import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, Cog, UserCircle, Power } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300 h-16">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left Section - Profile */}
          {authUser && (
            <Link
            to="/profile"
            className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
            >
            <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 relative">
              {/* Animated orbiting ring */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white/30 animate-spin-slow" />
              
              {/* Profile icon with hover scale */}
              <UserCircle className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="text-base font-semibold text-gray-700 dark:text-gray-200">
              Profile
            </span>
            </Link>
          )}

          {/* Center Logo - T-CHAT */}
          <Link
            to="/"
            className="flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2"
          >
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 shadow-lg transform transition-all duration-300 hover:scale-95 animate-float">
              <MessageSquare className="w-6 h-6 text-white animate-bounce" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              T-CHAT
            </h1>
          </Link>

          {/* Right Section - Settings & Logout */}
          <div className="flex items-center gap-3">
            {/* Settings (Always Visible) */}
            <Link
              to="/settings"
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 group relative"
            >
              <Cog className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors animate-spin-slow" />
              <span className="sr-only">Settings</span>
            </Link>

            {/* Logout (Conditional on authUser) */}
            {authUser && (
              <button
                onClick={logout}
                className="p-2.5 rounded-xl bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 transition-all duration-300 group relative"
              >
                <Power className="w-6 h-6 text-red-600 dark:text-red-400 group-hover:scale-110 group-active:rotate-90 transition-transform animate-pulse" />
                <span className="sr-only">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;