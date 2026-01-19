import React, { useEffect, useState } from "react";
import { User, Mail, Lock, Save, X, Key, ShieldCheck } from "lucide-react";
import api from "../apis/axios";

export default function ProfilePage() {
  // Mock User Data
  const [user, setUser] = useState({
    name: "",
    email: "",
    // We don't store actual password in state for display, just for the logic below
  });
  
  useEffect(() => {
    const fetchUserProfile = async () => {
   const response = await api.get("/profile");
    return response.data.user;
  };
    fetchUserProfile().then((data) => setUser(data));
  }
, []);

  // State for Password Editing
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [message, setMessage] = useState(null);

  // Helper: Get Initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    setMessage(null);

    // Basic Validation
    if (passwordForm.new !== passwordForm.confirm) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (passwordForm.new.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    // Simulate API Call
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordForm({ current: "", new: "", confirm: "" });
      setMessage({ type: "success", text: "Password updated successfully!" });
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header / Title */}
        <div>
          <h1 className="text-2xl font-bold text-white">Account Settings</h1>
          <p className="text-gray-300 text-sm">Manage your profile and security preferences.</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`p-4 rounded-lg flex items-center gap-2 text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.type === "success" ? <ShieldCheck size={18} /> : <X size={18} />}
            {message.text}
          </div>
        )}

        <div className="bg-gray-200 shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          
          {/* ================= TOP SECTION: Identity ================= */}
          <div className="p-6 sm:p-8 border-b  border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* Avatar Circle */}
            <div className="shrink-0 relative">
              <div className="h-24 w-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-indigo-50">
                {getInitials(user.name)}
              </div>
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-100">
                <ShieldCheck size={16} className="text-green-500" />
              </div>
            </div>

            {/* Name & Email Display */}
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                <Mail size={14} /> {user.email}
              </p>
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full border border-gray-200">
                  Joined 2026
                </span>
              </div>
            </div>
          </div>

          {/* ================= BOTTOM SECTION: Forms ================= */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Read-Only Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User size={16} className="text-gray-400" /> Full Name
                </label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed select-none">
                  {user.name}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" /> Email Address
                </label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed select-none">
                  {user.email}
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Password Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Key size={20} className="text-indigo-600" />
                  Password
                </h3>
                {!isChangingPassword && (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
                  >
                    Change Password
                  </button>
                )}
              </div>

              {!isChangingPassword ? (
                // Static View
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-md border border-gray-200">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <span className="text-gray-600 font-mono tracking-widest text-lg">
                      ••••••••••••
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">Last changed 3 months ago</span>
                </div>
              ) : (
                // Editing View
                <form onSubmit={handleSavePassword} className="bg-gray-50 p-6 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-4">
                    
                    {/* Current Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="current"
                        value={passwordForm.current}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Enter current password"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* New Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="new"
                          value={passwordForm.new}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                          placeholder="Min 6 chars"
                          required
                        />
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          name="confirm"
                          value={passwordForm.confirm}
                          onChange={handlePasswordChange}
                          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all ${
                             passwordForm.confirm && passwordForm.new !== passwordForm.confirm
                              ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                              : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                          }`}
                          placeholder="Re-enter new password"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setMessage(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center gap-2 shadow-sm transition-all"
                    >
                      <Save size={16} /> Update Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}