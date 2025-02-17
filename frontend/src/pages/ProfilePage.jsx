import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Sparkles, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto p-4 py-8">
        <motion.div
          className="bg-glass backdrop-blur-xl rounded-2xl p-8 space-y-8 shadow-2xl border border-white/10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Profile
            </h1>
            <p className="text-lg text-base-content/80 mt-2">
              Your Digital Identity
              <Sparkles className="w-5 h-5 text-yellow-400 inline-block ml-2" />
            </p>
          </div>

          {/* Avatar Upload Section */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative group">
              <motion.img
                src={selectedImg || authUser.profilePic || "/images.png"}
                alt="Profile"
                className="size-40 rounded-full object-cover border-4 border-primary/30 shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 100 }}
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 bg-primary/90 p-3 rounded-full cursor-pointer shadow-lg
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-6 h-6 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/70">
              {isUpdatingProfile ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-xs"></span>
                  Optimizing your avatar...
                </span>
              ) : (
                "Click the camera to upload new magic ✨"
              )}
            </p>
          </motion.div>

          {/* Profile Info Section */}
          <div className="space-y-6">
            <motion.div
              className="group relative bg-gradient-to-br from-base-200 to-base-300 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-1.5">
                <div className="text-sm text-primary flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Digital Identity</span>
                </div>
                <div className="px-4 py-3 bg-base-100 rounded-lg border border-base-content/10 transition-all group-hover:border-primary/30">
                  <p className="text-lg font-medium">{authUser?.fullName}</p>
                  <BadgeCheck className="w-5 h-5 text-blue-500 inline-block ml-2" />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative bg-gradient-to-br from-base-200 to-base-300 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-1.5">
                <div className="text-sm text-primary flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Digital Inbox</span>
                </div>
                <div className="px-4 py-3 bg-base-100 rounded-lg border border-base-content/10 transition-all group-hover:border-primary/30">
                  <p className="text-lg font-medium">{authUser?.email}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Account Info Section */}
          <motion.div
            className="bg-glass backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="bg-primary/10 px-3 py-1 rounded-lg">🔒 Account Security</span>
            </h2>
            <div className="space-y-4 text-base">
              <div className="flex items-center justify-between p-4 bg-base-100 rounded-xl border border-base-content/10 hover:border-primary/30 transition-all">
                <span className="flex items-center gap-2">
                  <span className="text-base-content/70">Member Since</span>
                </span>
                <span className="font-medium text-primary">
                  {new Date(authUser.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-base-100 rounded-xl border border-base-content/10 hover:border-primary/30 transition-all">
                <span className="flex items-center gap-2">
                  <span className="text-base-content/70">Account Status</span>
                </span>
                <span className="flex items-center gap-2 text-green-500 font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Active
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;

// this is the main page