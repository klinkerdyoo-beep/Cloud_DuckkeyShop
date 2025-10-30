import Path from '../components/Path';
import Narbar from '../components/Narbar';
import Profile from '../components/Profile';
import bg1 from '../assets/img/bg1.png';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import type { User } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export default function Account() {
  const { user } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [showChange, setShowChange] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    phone: "",
    email: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Load user info into formData when context updates
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
  try {
    // Build payload
    const payload: any = { ...formData };

    // Only send passwords if user wants to change
    if (newPassword) {
      if (!currentPassword) {
        return alert("Please enter current password to change your password.");
      }
      if (newPassword !== confirmPassword) {
        return alert("New password and confirm password do not match.");
      }
      payload.currentPassword = currentPassword;
      payload.newPassword = newPassword;
    }

    const res = await axios.put(`${API_URL}/api/update-user`, payload, {
      withCredentials: true,
    });

    // Update formData with returned user (excluding password)
    const updatedUser = res.data.user;
    setFormData({
      username: updatedUser.username,
      name: updatedUser.name,
      phone: updatedUser.phone,
      email: updatedUser.email,
    });

    // Clear password fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setEditMode(false);
    setShowChange(false);

    alert("User updated successfully!");
    console.log("Saved successfully:", res.data);
  } catch (err: any) {
    console.error("Failed to save:", err.response?.data || err.message);

    // Handle duplicate username/email
    if (err.response?.data?.message?.includes("duplicate")) {
      alert("Username already exists. Please choose another.");
    } else if (err.response?.data?.message) {
      alert(`${err.response.data.message}`);
    } else {
      alert("Failed to save user. Please try again.");
    }
  }
};

  return (
    <div className="text-black">
      <div
        style={{ backgroundImage: `url(${bg1})` }}
        className="bg-cover bg-fixed bg-center min-h-screen"
      >
        <Narbar />
        <Path />

        <div className="flex flex-row bg-white/90">
          <Profile />

          <div className="flex flex-1 flex-col items-center gap-4 justify-center mb-10">
            {/* Username */}
            <div className="p-2 mt-5">
              <h2 className="text-sm mb-2">Username</h2>
              <input
                type="text"
                name="username"
                disabled={!editMode}
                onChange={handleChange}
                value={formData.username}
                className="w-full outline-none px-2 border-2 max-w-sm"
              />
            </div>

            {/* Full Name */}
            <div className="p-2 mt-5">
              <h2 className="text-sm mb-2">Full Name</h2>
              <input
                type="text"
                name="name"
                disabled={!editMode}
                onChange={handleChange}
                value={formData.name}
                className="w-full outline-none px-2 border-2 max-w-sm"
              />
            </div>

            {/* Phone */}
            <div className="p-2 mt-5">
              <h2 className="text-sm mb-2">Phone Number</h2>
              <input
                type="text"
                name="phone"
                disabled={!editMode}
                onChange={handleChange}
                value={formData.phone}
                className="w-full outline-none px-2 border-2 max-w-sm"
              />
            </div>

            {/* Email */}
            <div className="p-2 mt-5">
              <h2 className="text-sm mb-2">Email</h2>
              <input
                type="text"
                name="email"
                disabled={!editMode}
                onChange={handleChange}
                value={formData.email}
                className="w-full outline-none px-2 border-2 max-w-sm"
              />
            </div>

            {editMode && (
              <div className="p-2 mt-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm mb-2">Current Password</h2>
                  <button
                    onClick={() => setShowChange(!showChange)}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition whitespace-nowrap"
                  >
                    Change?
                  </button>
                </div>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full outline-none px-2 border-2 max-w-sm"
                />
              </div>
            )}

            {/* New + Confirm Password */}
            {showChange && editMode && (
              <>
                <div className="p-2 mt-5">
                  <h2 className="text-sm mb-2">New Password</h2>
                  <input
                    type="password"
                    disabled={!editMode}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full outline-none px-2 border-2 max-w-sm"
                  />
                </div>
                <div className="p-2 mt-5">
                  <h2 className="text-sm mb-2">Confirm New Password</h2>
                  <input
                    type="password"
                    disabled={!editMode}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full outline-none px-2 border-2 max-w-sm"
                  />
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex justify-end space-x-2 mt-5">
              {editMode ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 border-2 rounded-full text-sm font-medium border-green-500 text-green-600 hover:bg-green-50 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setShowChange(false);
                      if (user) {
                        setFormData({
                          username: user.username || "",
                          name: user.name || "",
                          phone: user.phone || "",
                          email: user.email || "",
                        });
                      }
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                    className="px-4 py-2 border-2 rounded-full text-sm font-medium border-red-500 text-red-600 hover:bg-red-50 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 border-2 rounded-full text-sm font-medium border-gray-400 text-gray-600 hover:bg-gray-100 transition"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
