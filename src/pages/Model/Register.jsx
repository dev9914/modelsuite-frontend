import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const countries = [
  { name: "Germany", code: "+49", cities: ["Berlin", "Munich", "Hamburg"] },
  { name: "India", code: "+91", cities: ["Delhi", "Mumbai", "Bangalore"] },
  { name: "United States", code: "+1", cities: ["New York", "Los Angeles", "Chicago"] },
  { name: "United Kingdom", code: "+44", cities: ["London", "Manchester", "Birmingham"] },
  { name: "France", code: "+33", cities: ["Paris", "Lyon", "Marseille"] },
  { name: "Canada", code: "+1", cities: ["Toronto", "Vancouver", "Montreal"] },
];

const categories = ["Fashion", "Fitness", "Beauty", "Lifestyle", "Commercial"];

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    country: "",
    city: "",
    category: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    profilePhoto: "",
  });

  const [countryCode, setCountryCode] = useState("+49");
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      const selected = countries.find((c) => c.name === value);
      setCountryCode(selected?.code || "+49");
      setCities(selected?.cities || []);
      setFormData((prev) => ({ ...prev, city: "" }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const is18OrOlder = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    return age > 18 || (age === 18 && m >= 0);
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("image", file);
    try {
      const res = await axios.post(`${baseURL}/upload/profile-photo`, data);
      return res.data.imageUrl;
    } catch (err) {
      console.error("Upload failed:", err);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!is18OrOlder(formData.dob)) {
      setError("You must be at least 18 years old to register.");
      return;
    }

    const payload = {
      ...formData,
      phone: `${countryCode}${formData.phone}`,
    };

    try {
      const res = await axios.post(`${baseURL}/model/register`, payload);
      setSuccess(res.data.message);
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/model/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">ModelSuite</h1>
        <div className="space-x-4">
          <Link to="/model/login" className="text-blue-600 hover:underline font-medium">Model Login</Link>
          <Link to="/model/register" className="text-blue-600 hover:underline font-medium">Model Register</Link>
          <Link to="/agency/login" className="text-green-600 hover:underline font-medium">Agency Login</Link>
          <Link to="/agency/register" className="text-green-600 hover:underline font-medium">Agency Register</Link>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Model Registration</h2>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="fullName" onChange={handleChange} value={formData.fullName} placeholder="Full Name" className="input" />
              <input type="date" name="dob" onChange={handleChange} value={formData.dob} className="input" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="country" value={formData.country} onChange={handleChange} className="input">
                <option value="">Select Country</option>
                {countries.map((c, idx) => (
                  <option key={idx} value={c.name}>{c.name}</option>
                ))}
              </select>
              <select name="city" value={formData.city} onChange={handleChange} className="input">
                <option value="">Select City</option>
                {cities.map((city, idx) => (
                  <option key={idx} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <select name="category" value={formData.category} onChange={handleChange} className="input">
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Email" className="input" />
              <div className="flex items-center gap-2">
                <span className="px-3 py-2 bg-gray-200 border border-gray-300 rounded-md">{countryCode}</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className="input flex-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="username" onChange={handleChange} value={formData.username} placeholder="Username" className="input" />
              <input type="file" accept="image/*" className="input text-sm" onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  const imageUrl = await uploadToCloudinary(file);
                  setFormData((prev) => ({ ...prev, profilePhoto: imageUrl }));
                }
              }} />
            </div>

            <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Password" className="input" />
            <input type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} placeholder="Confirm Password" className="input" />

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/model/login" className="text-blue-600 hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
