// /layouts/ModelLayout.jsx
import { Outlet } from "react-router-dom"
import socket from "../utils/socket"
import { useEffect } from "react"

const ModelLayout = () => {
  const user = JSON.parse(localStorage.getItem('auth'))?.user;

  useEffect(() => {
    if (user?._id) {
      socket.emit('register', { userId: user._id });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100">
      {/* Optional: Add model-specific navbar */}
      <Outlet />
    </div>
  );
};

export default ModelLayout;
