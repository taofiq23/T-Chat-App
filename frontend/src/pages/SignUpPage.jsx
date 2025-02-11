import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
  <div className="flex flex-col items-center gap-2 group">
    {/* Gradient Animated Logo */}
    <div className="w-14 h-14 rounded-[18%] bg-gradient-to-r from-[#2563eb] to-[#9333ea] flex items-center justify-center shadow-lg transform transition-all duration-500 hover:scale-105 hover:rotate-6 relative overflow-hidden cursor-pointer">
      
      {/* Floating Container */}
      <div className="absolute inset-0 flex items-center justify-center animate-float-3d">
        {/* Morphing Outline */}
        <div className="absolute w-[120%] h-[120%] border border-white/20 rounded-[25%] animate-morph-border-fast" />
        
        {/* Core Symbol */}
        <div className="relative z-10">
          {/* Animated T Character */}
          <div className="text-2xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent relative">
            T
            {/* Dynamic Particles */}
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3">
              {[...Array(4)].map((_,i) => (
                <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-particle-quick" 
                  style={{animationDelay: `${i*0.15}s`}} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute w-24 h-24 bg-[radial-gradient(circle,white,transparent)] opacity-10 animate-radiate-fast" />
        <div className="absolute inset-0 bg-[conic-gradient(from_180deg,transparent_0%,white_50%,transparent_100%)] opacity-5 animate-conic-sweep-fast" />
        {/* New Ripple Effect */}
        <div className="absolute inset-0 animate-ripple-circle" />
      </div>
    </div>

    {/* Text Content */}
    {/* <h1
      style={{
        fontSize: "2.5rem",
        fontWeight: "800",
        background: "linear-gradient(to right, #2563eb, #9333ea)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        marginTop: "0.5rem",
      }}
    >
      Create Account
    </h1> */}
    <h1 className="text-4xl font-bold mt-2">Creat an Account</h1>
    <p className="text-gray-500/90 text-base animate-text-glow-fast">Get started with your free account</p>
  </div>
</div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="name..."
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="Hey, This is Taofiq"
        subtitle="Connect with friends, Enjoy special features, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default SignUpPage;