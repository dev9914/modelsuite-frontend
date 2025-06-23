import { Link } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen bg-gray-50">
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">ModelSuite</h1>
      <div className="space-x-4">
        <Link to="/model/login" className="text-blue-600 hover:underline font-medium">Model Login</Link>
        <Link to="/agency/login" className="text-green-600 hover:underline font-medium">Agency Login</Link>
      </div>
    </nav>

    <div className="flex flex-col items-center justify-center py-20 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Welcome to ModelSuite</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md">
        <Link to="/model/register" className="bg-blue-600 text-white py-2 rounded text-center hover:bg-blue-700 font-medium">
          Model Register
        </Link>
        <Link to="/model/login" className="bg-blue-600 text-white py-2 rounded text-center hover:bg-blue-700 font-medium">
          Model Login
        </Link>
        <Link to="/agency/register" className="bg-green-600 text-white py-2 rounded text-center hover:bg-green-700 font-medium">
          Agency Register
        </Link>
        <Link to="/agency/login" className="bg-green-600 text-white py-2 rounded text-center hover:bg-green-700 font-medium">
          Agency Login
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
