"use client"

import { useState, useEffect } from "react"

const ReelsMetricsOverview = () => {
  const metrics = [
    { label: "Reels Published", value: 12, change: "+20%", icon: "🎬", color: "from-purple-500 to-indigo-600" },
    { label: "Reels Reach", value: "2.86M", change: "+18%", icon: "👁️", color: "from-blue-500 to-cyan-600" },
    { label: "Reels Plays", value: "3.29M", change: "+24%", icon: "▶️", color: "from-green-500 to-emerald-600" },
    { label: "Avg. Play Rate", value: "1.24x", change: "+8%", icon: "🔄", color: "from-orange-500 to-red-600" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={metric.label} className={`bg-gradient-to-br ${metric.color} rounded-2xl p-6 text-white`}>
          <div className="text-3xl mb-2">{metric.icon}</div>
          <h3 className="text-lg font-medium opacity-90 mb-2">{metric.label}</h3>
          <p className="text-3xl font-bold">{metric.value}</p>
          <p className="text-sm opacity-80 mt-2">{metric.change} vs last week</p>
        </div>
      ))}
    </div>
  )
}

const ReelsPerformanceChart = () => {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const dailyData = [
    { date: "1 Jul", reels: 2, plays: 485000, reach: 425000 },
    { date: "2 Jul", reels: 1, plays: 520000, reach: 445000 },
    { date: "3 Jul", reels: 4, plays: 680000, reach: 580000 },
    { date: "4 Jul", reels: 0, plays: 0, reach: 0 },
    { date: "5 Jul", reels: 2, plays: 450000, reach: 390000 },
    { date: "6 Jul", reels: 0, plays: 0, reach: 0 },
    { date: "7 Jul", reels: 3, plays: 750000, reach: 650000 },
  ]

  const maxPlays = Math.max(...dailyData.map((d) => d.plays))

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Daily Reels Performance</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {dailyData.map((day, index) => {
          const height = day.plays > 0 ? (day.plays / maxPlays) * 100 : 0
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all duration-1000"
                style={{
                  height: animated ? `${Math.max(height, day.plays > 0 ? 10 : 0)}%` : "0%",
                  transitionDelay: `${index * 100}ms`,
                }}
              />
              <div className="text-xs mt-2 text-center">
                <div className="font-medium">{day.date}</div>
                <div className="text-purple-300">{day.reels} reels</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <div className="font-bold text-purple-400">469,286</div>
          <div className="opacity-70">Avg. Plays per Day</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-pink-400">1.71</div>
          <div className="opacity-70">Avg. Reels per Day</div>
        </div>
      </div>
    </div>
  )
}

const ReelsEngagementBreakdown = () => {
  const engagementTypes = [
    { type: "Likes", percentage: 90, count: 16952, color: "from-red-400 to-red-600" },
    { type: "Comments", percentage: 9, count: 1695, color: "from-blue-400 to-blue-600" },
    { type: "Saves", percentage: 1, count: 188, color: "from-green-400 to-green-600" },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Reels Engagement Types</h3>
      <div className="space-y-4">
        {engagementTypes.map((type, index) => (
          <div key={type.type} className="flex items-center gap-4">
            <div className="w-20 text-sm font-medium">{type.type}</div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm opacity-70">{type.percentage}%</span>
                <span className="text-sm font-medium">{type.count.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className={`bg-gradient-to-r ${type.color} h-3 rounded-full transition-all duration-1000`}
                  style={{
                    width: `${type.percentage}%`,
                    transitionDelay: `${index * 200}ms`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl text-center">
        <div className="text-2xl font-bold text-purple-400">18,835</div>
        <div className="text-sm opacity-70">Total Reels Engagements</div>
      </div>
    </div>
  )
}

const TopPerformingReels = () => {
  const reels = [
    {
      id: 1,
      title: "Chocolate cake making process",
      plays: 890000,
      likes: 7200,
      comments: 450,
      saves: 320,
      date: "July 7",
      duration: "28s",
    },
    {
      id: 2,
      title: "Macaron tower assembly",
      plays: 650000,
      likes: 5400,
      comments: 380,
      saves: 280,
      date: "July 3",
      duration: "22s",
    },
    {
      id: 3,
      title: "Cupcake decoration tutorial",
      plays: 520000,
      likes: 4100,
      comments: 290,
      saves: 210,
      date: "July 1",
      duration: "35s",
    },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Top Performing Reels</h3>
      <div className="space-y-4">
        {reels.map((reel, index) => (
          <div key={reel.id} className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-sm font-bold">
                  #{index + 1}
                </div>
                <div>
                  <div className="font-medium">{reel.title}</div>
                  <div className="text-sm opacity-70">
                    {reel.date} • {reel.duration}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-purple-400">{reel.plays.toLocaleString()}</div>
                <div className="text-xs opacity-70">Plays</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-red-400">{reel.likes.toLocaleString()}</div>
                <div className="opacity-70">Likes</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-blue-400">{reel.comments.toLocaleString()}</div>
                <div className="opacity-70">Comments</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-green-400">{reel.saves.toLocaleString()}</div>
                <div className="opacity-70">Saves</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ReelsInsights = () => {
  const insights = [
    {
      title: "Best Publishing Time",
      value: "6 PM - 9 PM",
      description: "Peak engagement hours",
      icon: "⏰",
    },
    {
      title: "Optimal Duration",
      value: "20-30 seconds",
      description: "Highest completion rates",
      icon: "⏱️",
    },
    {
      title: "Top Content Type",
      value: "Process Videos",
      description: "Behind-the-scenes content",
      icon: "🎬",
    },
    {
      title: "Engagement Rate",
      value: "0.84%",
      description: "Above industry average",
      icon: "📈",
    },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Reels Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div key={insight.title} className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">{insight.icon}</div>
              <div className="font-medium">{insight.title}</div>
            </div>
            <div className="text-lg font-bold text-purple-400 mb-1">{insight.value}</div>
            <div className="text-sm opacity-70">{insight.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ReelsAnalytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Reels Analytics</h2>
        <p className="text-purple-200">Track your Instagram Reels performance</p>
      </div>

      {/* Key Metrics */}
      <ReelsMetricsOverview />

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReelsPerformanceChart />
        <ReelsEngagementBreakdown />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPerformingReels />
        <ReelsInsights />
      </div>

      {/* Reels Publishing Schedule */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-6">Reels Publishing Schedule</h3>
        <div className="grid grid-cols-7 gap-2">
          {[
            { day: "Mon", reels: 2, engagement: "high" },
            { day: "Tue", reels: 1, engagement: "medium" },
            { day: "Wed", reels: 4, engagement: "high" },
            { day: "Thu", reels: 0, engagement: "none" },
            { day: "Fri", reels: 2, engagement: "medium" },
            { day: "Sat", reels: 0, engagement: "none" },
            { day: "Sun", reels: 3, engagement: "high" },
          ].map((dayData, index) => (
            <div key={dayData.day} className="text-center">
              <div className="text-sm font-medium mb-2">{dayData.day}</div>
              <div className="h-24 bg-white/10 rounded-lg flex items-end justify-center p-2">
                <div
                  className={`w-full rounded transition-all duration-1000 ${
                    dayData.engagement === "high"
                      ? "bg-gradient-to-t from-green-500 to-emerald-400"
                      : dayData.engagement === "medium"
                        ? "bg-gradient-to-t from-yellow-500 to-orange-400"
                        : "bg-gradient-to-t from-gray-500 to-gray-400"
                  }`}
                  style={{ height: `${(dayData.reels / 4) * 100}%` }}
                />
              </div>
              <div className="text-xs mt-2">
                <div className="font-medium">{dayData.reels}</div>
                <div className="opacity-70">reels</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-sm opacity-70">
          Wednesday shows highest reels activity with 4 reels published
        </div>
      </div>
    </div>
  )
}
