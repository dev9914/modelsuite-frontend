import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(`${baseURL}/agency/login`, formData);
      localStorage.setItem("auth", JSON.stringify(res.data));
      setSuccess("Login successful");
      navigate("/agency/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      <nav className="bg-gray-900 border-b border-gray-800 shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">ModelSuite</h1>
        <div className="space-x-4">
          <Link to="/model/login" className="text-blue-400 hover:text-blue-200 font-semibold transition">Model Login</Link>
          <Link to="/model/register" className="text-blue-400 hover:text-blue-200 font-semibold transition">Model Register</Link>
          <Link to="/agency/login" className="text-green-400 hover:text-green-200 font-semibold transition">Agency Login</Link>
          <Link to="/agency/register" className="text-green-400 hover:text-green-200 font-semibold transition">Agency Register</Link>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md border-t-4 border-green-500">
          <h2 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow-sm">Agency Login</h2>

          {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
          {success && <p className="text-green-400 text-sm text-center mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Username or Email"
              className="input bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-300">
            Don't have an account?{' '}
            <Link to="/agency/register" className="text-green-400 hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>

      <footer className="mt-auto py-6 text-center text-gray-500 text-sm border-t border-gray-800 bg-gray-900">
        &copy; {new Date().getFullYear()} ModelSuite. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
