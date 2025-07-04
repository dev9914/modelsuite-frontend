import { useState, useEffect } from "react"

const MetricCard = ({ title, value, change, changeType, icon, color }) => (
  <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-xl`}>
    <div className="flex items-center justify-between mb-4">
      <div className="text-3xl">{icon}</div>
      <div
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          changeType === "positive"
            ? "bg-green-500/20 text-green-300"
            : changeType === "negative"
              ? "bg-red-500/20 text-red-300"
              : "bg-gray-500/20 text-gray-300"
        }`}
      >
        {change}
      </div>
    </div>
    <h3 className="text-lg font-medium opacity-90 mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
)

const ChartCard = ({ title, children }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    {children}
  </div>
)

const metricsTemplate = {
  followers: {
    title: "Followers",
    value: "2,850,314",
    change: "+0.1%",
    changeType: "positive",
    icon: "👥",
    color: "from-pink-500 to-rose-600",
  },
  impressions: {
    title: "Page Impressions",
    value: "283,719",
    change: "+44.2%",
    changeType: "positive",
    icon: "👁️",
    color: "from-blue-500 to-cyan-600",
  },
  stories: {
    title: "Stories",
    value: "113",
    change: "+13%",
    changeType: "positive",
    icon: "📱",
    color: "from-purple-500 to-indigo-600",
  },
  storyReach: {
    title: "Story Reach",
    value: "3,254,182",
    change: "+13%",
    changeType: "positive",
    icon: "📊",
    color: "from-green-500 to-emerald-600",
  },
  comments: {
    title: "Comments",
    value: "5,562",
    change: "+8.4%",
    changeType: "positive",
    icon: "💬",
    color: "from-orange-500 to-red-600",
  },
  likes: {
    title: "Likes",
    value: "22,730",
    change: "+12%",
    changeType: "positive",
    icon: "❤️",
    color: "from-red-500 to-pink-600",
  },
  engagements: {
    title: "Post Engagements",
    value: "29,437",
    change: "+36.9%",
    changeType: "positive",
    icon: "🔥",
    color: "from-yellow-500 to-orange-600",
  },
  organicEr: {
    title: "Organic ER per Post",
    value: "0.84%",
    change: "+5%",
    changeType: "positive",
    icon: "📈",
    color: "from-teal-500 to-blue-600",
  },
};


export default function DashboardOverview({accountInfo}) {
  const [animatedValues, setAnimatedValues] = useState({})

  const weeklyData = [
    { day: "1 Jul", followers: 2849693, impressions: 40000, engagement: 4200 },
    { day: "2 Jul", followers: 2849914, impressions: 42000, engagement: 4500 },
    { day: "3 Jul", followers: 2850135, impressions: 38000, engagement: 4100 },
    { day: "4 Jul", followers: 2850198, impressions: 45000, engagement: 4800 },
    { day: "5 Jul", followers: 2850256, impressions: 41000, engagement: 4300 },
    { day: "6 Jul", followers: 2850289, impressions: 39000, engagement: 4000 },
    { day: "7 Jul", followers: 2850314, impressions: 43000, engagement: 4600 },
  ]

  const [metrics, setMetrics] = useState(metricsTemplate);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({ loaded: true })
    }, 500)

    setMetrics((prev) => ({
  ...prev,
  followers: {
    ...prev.followers,
    value: accountInfo?.followers_count,
    change: "+1.3%", // optional
    changeType: "positive",
  },
}));
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-8">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.values(metrics).map((metric, index) => (
  <div
    key={metric.title}
    className="transform transition-all duration-500"
    style={{
      transform: animatedValues.loaded ? "translateY(0)" : "translateY(20px)",
      opacity: animatedValues.loaded ? 1 : 0,
      transitionDelay: `${index * 100}ms`,
    }}
  >
    <MetricCard {...metric} />
  </div>
))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Overview Chart */}
        <ChartCard title="Weekly Performance Overview">
          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between">
                <span className="text-sm font-medium w-16">{day.day}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{
                        width: animatedValues.loaded ? `${(day.engagement / 5000) * 100}%` : "0%",
                        transitionDelay: `${index * 200}ms`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm text-right w-20">{day.engagement.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Top Performing Content */}
        <ChartCard title="Content Performance Breakdown">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                <span>Posts</span>
              </div>
              <div className="text-right">
                <div className="font-bold">21</div>
                <div className="text-sm opacity-70">+4.5%</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span>Stories</span>
              </div>
              <div className="text-right">
                <div className="font-bold">113</div>
                <div className="text-sm opacity-70">+13%</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span>Reels</span>
              </div>
              <div className="text-right">
                <div className="font-bold">12</div>
                <div className="text-sm opacity-70">+20%</div>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Quick Stats */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-6">Quick Stats Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">125,375</div>
            <div className="text-sm opacity-70">Profile Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">13,448</div>
            <div className="text-sm opacity-70">Profile Engagements</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">1,706</div>
            <div className="text-sm opacity-70">New Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">36</div>
            <div className="text-sm opacity-70">Following</div>
          </div>
        </div>
      </div>
    </div>
  )
}
