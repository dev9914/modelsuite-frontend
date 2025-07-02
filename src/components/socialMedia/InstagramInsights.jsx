import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import clsx from 'clsx';

const InstagramDashboard = ({ Id, role }) => {
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
      console.log(data);
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
      ) : (
        <motion.div className="max-w-6xl mx-auto bg-[#1e293b] border border-slate-700 shadow-xl rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}>

          {/* Instagram Info */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img src={accountInfo.profile_picture_url} alt="Profile" className="w-20 h-20 rounded-full border-4 border-pink-600 shadow-md" />
              <div>
                <h2 className="text-xl font-bold">@{accountInfo.username}</h2>
                <p className="text-sm text-gray-400 mt-1 max-w-md">{accountInfo.biography || 'No bio available'}</p>
              </div>
            </div>
            {role === "model" && (
              <button onClick={handleDisconnect} className="mt-4 md:mt-0 bg-red-900 hover:bg-red-800 text-red-300 px-4 py-2 rounded-full">
                Disconnect
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            <InfoCard title="Followers" value={accountInfo.followers_count} color="pink" />
            {insights && <>
              <InfoCard title="Impressions" value={insights.impressions} color="blue" />
              <InfoCard title="Reach" value={insights.reach} color="green" />
              <InfoCard title="Profile Views" value={insights.profile_views} color="yellow" />
            </>}
            {storyInsights && <>
              <InfoCard title="Story Impressions" value={storyInsights.impressions} color="indigo" />
              <InfoCard title="Story Reach" value={storyInsights.reach} color="violet" />
              <InfoCard title="Taps Forward" value={storyInsights.taps_forward} color="rose" />
              <InfoCard title="Exits" value={storyInsights.exits} color="red" />
            </>}
          </div>

          {/* Facebook Page Info */}
          {fbPageInfo && (
            <>
              <div className="mt-10 mb-4 flex items-center space-x-3">
                <FaFacebookF className="text-blue-500 text-3xl" />
                <h3 className="text-2xl font-bold">Facebook Page (connected via Instagram)</h3>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <img src={fbPageInfo.picture?.data?.url} alt="FB Page" className="rounded-full w-16 h-16 border border-slate-600" />
                <div>
                  <h4 className="text-lg font-semibold">{fbPageInfo.name}</h4>
                  <a href={fbPageInfo.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm underline">
                    Visit Page
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <InfoCard title="Followers" value={fbPageInfo.fan_count} color="cyan" />
                <InfoCard title="Category" value={fbPageInfo.category} color="teal" />
                <InfoCard title="Page ID" value={fbPageInfo.id} color="gray" />
              </div>
            </>
          )}

          {/* Facebook Insights */}
          {fbInsights && (
            <>
              <div className="mt-10 mb-4">
                <h3 className="text-2xl font-bold">Facebook Page Insights</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <InfoCard title="Page Views" value={fbInsights.page_views_total} color="lime" />
                <InfoCard title="Impressions" value={fbInsights.page_impressions} color="sky" />
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

const InfoCard = ({ title, value, color }) => (
  <div className={`bg-gradient-to-br from-${color}-500/20 to-${color}-700/20 p-6 rounded-xl text-center shadow-md`}>
    <h3 className={`text-lg font-semibold text-${color}-400`}>{title}</h3>
    <p className={`text-3xl font-bold text-${color}-500`}>{value ?? '--'}</p>
  </div>
);

export default InstagramDashboard;
