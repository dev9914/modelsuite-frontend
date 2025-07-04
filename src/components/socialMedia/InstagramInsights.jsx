import { useEffect, useState } from "react"
import DashboardOverview from "./components/dashboard-overview"
import FollowersAnalytics from "./components/followers-analytics"
import Demographics from "./components/demographics"
import PostPerformance from "./components/post-performance"
import StoryAnalytics from "./components/story-analytics"
import ReelsAnalytics from "./components/reels-analytics"
import EngagementAnalytics from "./components/engagement-analytics"
import ProfileAnalytics from "./components/profile-analytics"
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

const navigationItems = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "followers", label: "Followers", icon: "👥" },
  { id: "demographics", label: "Demographics", icon: "📈" },
  { id: "posts", label: "Posts", icon: "📷" },
  { id: "stories", label: "Stories", icon: "📱" },
  { id: "reels", label: "Reels", icon: "🎬" },
  { id: "engagement", label: "Engagement", icon: "❤️" },
  { id: "profile", label: "Profile", icon: "👤" },
]

export default function InstagramDashboard({Id, role}) {
  const [activeTab, setActiveTab] = useState("overview")

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview accountInfo={accountInfo}/>
      case "followers":
        return <FollowersAnalytics accountInfo={accountInfo} />
      case "demographics":
        return <Demographics />
      case "posts":
        return <PostPerformance />
      case "stories":
        return <StoryAnalytics />
      case "reels":
        return <ReelsAnalytics />
      case "engagement":
        return <EngagementAnalytics />
      case "profile":
        return <ProfileAnalytics />
      default:
        return <DashboardOverview />
    }
  }

  const [connected, setConnected] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
  const [insights, setInsights] = useState(null);
  const [storyInsights, setStoryInsights] = useState(null);
  const [fbPageInfo, setFbPageInfo] = useState(null);
  const [fbInsights, setFbInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = JSON.parse(localStorage.getItem('auth'))?.token;
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const fetchAccountInfo = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/instagram/account-info/${Id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccountInfo(data.accountInfo);
      setConnected(true);
    } catch {
      setConnected(false);
      setError('Instagram not connected.');
    } finally {
      setLoading(false);
    }
  };

  const fetchInsights = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/instagram/insights/${Id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInsights(data.insights);
    } catch (err) {
      console.error('Failed to fetch insights:', err);
    }
  };

  const fetchStoryInsights = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/instagram/story-insights/${Id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStoryInsights(data.storyInsights);
    } catch (err) {
      console.error('Failed to fetch story insights:', err);
    }
  };

  const fetchFacebookPageInfo = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/instagram/facebook/page-info/${Id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFbPageInfo(data.pageInfo);
    } catch (err) {
      console.error('Failed to fetch FB Page info:', err);
    }
  };

  const fetchFacebookPageInsights = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/instagram/facebook/insights/${Id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFbInsights(data.pageInsights);
    } catch (err) {
      console.error('Failed to fetch FB Page insights:', err);
    }
  };

  const getFacebookPagePosts = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/instagram/facebook/posts/${Id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(data);
    } catch (err) {
      console.error('Failed to fetch FB Page posts:', err);
    }
  };

  const handleConnect = () => {
    const redirectUri = encodeURIComponent(`${baseURL}/instagram/callback`);
    const clientId = import.meta.env.VITE_META_APP_ID;
    const url = `https://www.facebook.com/v23.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=pages_show_list,instagram_basic,instagram_manage_insights,pages_read_engagement&state=${token}`;
    window.location.href = url;
  };

  const handleDisconnect = async () => {
    try {
      await axios.delete(`${baseURL}/instagram/disconnect/${Id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConnected(false);
      setAccountInfo(null);
      setInsights(null);
      setStoryInsights(null);
      setFbPageInfo(null);
      setFbInsights(null);
    } catch (err) {
      console.error('Disconnect failed:', err);
    }
  };

  useEffect(() => {
    fetchAccountInfo();
    fetchInsights();
    fetchStoryInsights();
    fetchFacebookPageInfo();
    fetchFacebookPageInsights();
    getFacebookPagePosts();
  }, [Id]);

  if (loading) return <div className="text-center py-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen px-4 py-12 bg-[#0f172a] text-white">
      {!connected ? (
         role === "model" ? (
          <motion.div className="max-w-xl mx-auto text-center bg-[#1e293b] border border-slate-700 shadow-2xl rounded-3xl p-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}>
            <FaInstagram className="text-pink-500 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Connect Your Instagram</h2>
            <p className="text-gray-400 mb-6">Link your business Instagram account to get real-time stats and insights.</p>
            <button onClick={handleConnect} className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full transition">
              Connect Instagram
            </button>
            {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
          </motion.div>
        ) : (
          <motion.div className="max-w-xl mx-auto text-center bg-[#1e293b] border border-slate-700 shadow-2xl rounded-3xl p-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}>
            <FaInstagram className="text-pink-500 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Model Instagram Account Is Not Connected</h2>
            <p className="text-gray-400 mb-6">Instagram account must be connected to get real-time stats and insights.</p>
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full transition">
              Assign Task To Model
            </button>
            {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
          </motion.div>
        )
      ):(
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            {role === "model" && (
              <button onClick={handleDisconnect} className="mt-4 md:mt-0 bg-red-900 hover:bg-red-800 text-red-300 px-4 py-2 rounded-full">
                Disconnect
              </button>
            )}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-white mb-2">Instagram Analytics Dashboard</h1>
              <p className="text-purple-200">Xuxo Patisserie - July 1-7, 2024</p>
            </div>
    
            {/* Navigation */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeTab === item.id ? "bg-white text-purple-900 shadow-lg" : "text-white hover:bg-white/20"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
    
            {/* Main Content */}
            <div className="transition-all duration-500">{renderActiveComponent()}</div>
          </div>
        </div>
      )}
    </div>
  )
}
