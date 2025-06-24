import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { 
  Home, 
  Calendar, 
  Users, 
  Settings, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  MessageCircle,
  Video,
  Gift,
  Mail,
  Zap,
  MessageSquare,
  UploadCloud,
  Flame,
  ShieldAlert,
  Trophy,
  Film
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ChatWindow from '../../components/ChatWindow'

export default function CreatorInsightsDashboard() {
  const [activeTab, setActiveTab] = useState('All');
  const [bestHourTab, setBestHourTab] = useState('All');

  // Sample data for charts
  const earningsData = [
    { day: 1, earnings: 150 },
    { day: 2, earnings: 200 },
    { day: 3, earnings: 180 },
    { day: 4, earnings: 250 },
    { day: 5, earnings: 220 },
    { day: 6, earnings: 300 },
    { day: 7, earnings: 280 },
    { day: 8, earnings: 320 },
    { day: 9, earnings: 290 },
    { day: 10, earnings: 350 },
    { day: 11, earnings: 400 },
    { day: 12, earnings: 380 },
    { day: 13, earnings: 420 },
    { day: 14, earnings: 450 },
    { day: 15, earnings: 380 },
    { day: 16, earnings: 360 },
    { day: 17, earnings: 340 },
    { day: 18, earnings: 320 },
    { day: 19, earnings: 300 },
    { day: 20, earnings: 350 },
    { day: 21, earnings: 400 },
    { day: 22, earnings: 480 },
    { day: 23, earnings: 520 },
    { day: 24, earnings: 500 },
    { day: 25, earnings: 450 },
    { day: 26, earnings: 420 },
    { day: 27, earnings: 380 },
    { day: 28, earnings: 360 },
    { day: 29, earnings: 340 },
    { day: 30, earnings: 320 }
  ];

  const bestDayData = [
    { day: 'Mon', earnings: 180 },
    { day: 'Tue', earnings: 195 },
    { day: 'Wed', earnings: 210 },
    { day: 'Thu', earnings: 185 },
    { day: 'Fri', earnings: 220 },
    { day: 'Sat', earnings: 250 },
    { day: 'Sun', earnings: 190 }
  ];

  const bestHourData = [
    { hour: '12AM', earnings: 50 },
    { hour: '2AM', earnings: 30 },
    { hour: '4AM', earnings: 20 },
    { hour: '6AM', earnings: 40 },
    { hour: '8AM', earnings: 80 },
    { hour: '10AM', earnings: 120 },
    { hour: '12PM', earnings: 150 },
    { hour: '2PM', earnings: 180 },
    { hour: '4PM', earnings: 200 },
    { hour: '6PM', earnings: 220 },
    { hour: '8PM', earnings: 250 },
    { hour: '10PM', earnings: 180 }
  ];

const [sidebarItems, setSidebarItems] = useState([
  { icon: MessageSquare, label: 'Messenger',active: false },
  { icon: Calendar, label: 'Billing' },
  { icon: Calendar, label: 'Calendar' },
  { icon: Calendar, label: 'Tasks' },
  { icon: TrendingUp, label: 'Traffic' },
  { icon: Calendar, label: 'Postings' },
  { icon: UploadCloud, label: 'Content Upload' },
  { icon: Flame, label: 'Viral Trends' },
  { icon: ShieldAlert, label: 'Leak Protection' },
  { icon: Users, label: 'Team Members' },
  { icon: Gift, label: 'Paid Platforms' },
  { icon: Trophy, label: 'Rewards' },
  { icon: Film, label: 'Reel Examples' },
]);


  const tabItems = ['All', 'Subscriptions', 'Recurring subscriptions', 'Tips', 'Posts', 'Messages', 'Streams'];

  const { id } = useParams();

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const[modeinfo, setModelInfo] = useState({});

  const fetchModel = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;
        const res = await axios.get(`${baseURL}/model/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setModelInfo(res.data);
      } catch (err) {
        console.error("Failed to fetch model:", err);
      }
    };

    useEffect(()=> {
        fetchModel();
    },[id])

    const activeMenu = sidebarItems.find((item) => item.active)?.label;

    const handleTabClick = (label) => {
  const updatedItems = sidebarItems.map((item) => ({
    ...item,
    active: item.label === label, // only the clicked one is active
  }));
  setSidebarItems(updatedItems);
};


  return (
    <div className="flex bg-gray-900 text-white ml-16">
      {/* Sidebar */}
      <div className="w-64 overflow-y-auto h-[87.2vh] scrollbar-none bg-gray-900 p-4">

        <div onClick={() => {
    const reset = sidebarItems.map((item) => ({ ...item, active: false }));
    setSidebarItems(reset);
  }} className="mb-4 cursor-pointer">
          
          <div className="bg-gray-700 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <img className="w-8 h-8 rounded-full object-cover mr-3" alt='AM'  src={modeinfo.profilePhoto}/>
              <span className="font-medium">{modeinfo.fullName || "Loading..."}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleTabClick(item.label)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                item.active ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      {!activeMenu && (
        <div className="flex-1 h-[87.2vh] overflow-y-auto scrollbar-none p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Creator Insights</h1>
          <div className="flex items-center space-x-4">
            <select className="bg-gray-800 border border-gray-600 rounded px-3 py-2">
              <option>All creators</option>
            </select>
            <div className="flex items-center space-x-2">
              <span>Time Range:</span>
              <input 
                type="checkbox" 
                checked 
                className="form-checkbox h-4 w-4 text-blue-600"
                readOnly
              />
              <span>Q4 Time Zone</span>
              <input 
                type="datetime-local" 
                defaultValue="2025-04-22T12:59"
                className="bg-gray-800 border border-gray-600 rounded px-3 py-2"
              />
            </div>
            <select className="bg-gray-800 border border-gray-600 rounded px-3 py-2">
              <option>Net</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-2">
              <DollarSign className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-gray-400">Total Earnings</span>
            </div>
            <div className="text-3xl font-bold">$ 6,642,281.68</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-2">
              <ShoppingCart className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-gray-400">Total Purchases</span>
            </div>
            <div className="text-3xl font-bold">355,060</div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-xl font-bold mb-2">STATS MENU 2</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-400">Spenders</div>
                <div className="text-2xl font-bold">125,748</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm">AI</div>
              <div className="text-xs">Subscriptions</div>
            </div>
          </div>
        </div>

        {/* Main Chart Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Earnings Chart */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Earnings Chart</h3>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold">Status MENU 1</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Menu 2 */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-center mb-8">
              <div className="text-2xl font-bold">STATS MENU 2</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Best Day Chart */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Best Day</h3>
            
            {/* Tabs */}
            <div className="flex space-x-1 mb-4 bg-gray-700 rounded-lg p-1">
              {tabItems.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    activeTab === tab 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bestDayData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <Bar dataKey="earnings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Best Hour Chart */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Best Hour</h3>
            
            {/* Tabs */}
            <div className="flex space-x-1 mb-4 bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setBestHourTab('All')}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  bestHourTab === 'All' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setBestHourTab('Subscriptions')}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  bestHourTab === 'Subscriptions' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Subscriptions
              </button>
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bestHourData}>
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} />
                  <Bar dataKey="earnings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      )}
      {activeMenu == 'Messenger' && (
        <div className="flex-1 h-[87.2vh] overflow-y-auto scrollbar-none p-6">
          <ChatWindow id={id} />
        </div>
      )}
      
    </div>
  );
}