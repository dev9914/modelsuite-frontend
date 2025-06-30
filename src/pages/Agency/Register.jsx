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

const categories = ["Fashion", "Talent", "Commercial", "Production"];
const companySizes = ["1-10", "11-50", "51-200", "200+"];
const agencyTypes = ["Talent", "Advertising", "Full-Modeling", "Production", "Fashion"];

const Register = () => {
  const [formData, setFormData] = useState({
    agencyName: "",
    agencyEmail: "",
    phone: "",
    website: "",
    country: "",
    city: "",
    category: "",
    companySize: "",
    agencyType: "",
    socialLink: "",
    certificate: "",
    username: "",
    password: "",
    confirmPassword: "",
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

    const payload = {
      ...formData,
      phone: `${countryCode}${formData.phone}`,
    };

    try {
      const res = await axios.post(`${baseURL}/agency/register`, payload);
      setSuccess(res.data.message);
      localStorage.setItem("auth", JSON.stringify(res.data));
      navigate("/agency/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong");
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
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-xl border-t-4 border-green-500">
          <h2 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow-sm">Agency Registration</h2>

          {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
          {success && <p className="text-green-400 text-sm text-center mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="agencyName" value={formData.agencyName} onChange={handleChange} placeholder="Agency Name" className="input bg-gray-800 border border-gray-700 text-white placeholder-gray-400" />
            <input type="email" name="agencyEmail" value={formData.agencyEmail} onChange={handleChange} placeholder="Agency Email" className="input bg-gray-800 border border-gray-700 text-white placeholder-gray-400" />
            <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="Website (optional)" className="input bg-gray-800 border border-gray-700 text-white placeholder-gray-400" />

            <div className="flex items-center gap-2">
              <span className="px-3 py-2 bg-gray-700 border border-gray-700 rounded-md text-white">{countryCode}</span>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" className="input flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="country" value={formData.country} onChange={handleChange} className="input bg-gray-800 border border-gray-700 text-white">
                <option value="">Select Country</option>
                {countries.map((c, idx) => (
                  <option key={idx} value={c.name}>{c.name}</option>
                ))}
              </select>
              <select name="city" value={formData.city} onChange={handleChange} className="input bg-gray-800 border border-gray-700 text-white">
                <option value="">Select City</option>
                {cities.map((city, idx) => (
                  <option key={idx} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <select name="category" value={formData.category} onChange={handleChange} className="input bg-gray-800 border border-gray-700 text-white">
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="companySize" value={formData.companySize} onChange={handleChange} className="input bg-gray-800 border border-gray-700 text-white">
                <option value="">Company Size</option>
                {companySizes.map((size, idx) => (
                  <option key={idx} value={size}>{size}</option>
                ))}
              </select>
              <select name="agencyType" value={formData.agencyType} onChange={handleChange} className="input bg-gray-800 border border-gray-700 text-white">
                <option value="">Agency Type</option>
                {agencyTypes.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <input type="text" name="socialLink" value={formData.socialLink} onChange={handleChange} placeholder="Social Media URL" className="input bg-gray-800 border border-gray-700 text-white placeholder-gray-400" />

            <input type="file" accept="image/*" className="input text-sm bg-gray-800 border border-gray-700 text-white" onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  const imageUrl = await uploadToCloudinary(file);
                  setFormData((prev) => ({ ...prev, profilePhoto: imageUrl }));
                }
              }} />

            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="input bg-gray-800 border border-gray-700 text-white placeholder-gray-400" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="input bg-gray-800 border border-gray-700 text-white placeholder-gray-400" />
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="input bg-gray-800 border border-gray-700 text-white placeholder-gray-400" />

            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold transition">
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-300">
            Already have an account?{" "}
            <Link to="/agency/login" className="text-green-400 hover:underline font-medium">
              Login here
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

export default Register;
