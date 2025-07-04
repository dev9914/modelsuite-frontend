"use client"

import { useState, useEffect } from "react"

const StoryMetricsOverview = () => {
  const metrics = [
    { label: "Stories Published", value: 113, change: "+13%", icon: "📱", color: "from-purple-500 to-indigo-600" },
    { label: "Story Reach", value: "3.25M", change: "+13%", icon: "👁️", color: "from-blue-500 to-cyan-600" },
    { label: "Story Impressions", value: "3.34M", change: "+15%", icon: "📊", color: "from-green-500 to-emerald-600" },
    { label: "Completion Rate", value: "5.74%", change: "+2.1%", icon: "✅", color: "from-orange-500 to-red-600" },
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

const StoryEngagementChart = () => {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const dailyData = [
    { date: "1 Jul", stories: 16, engagement: 447191, reach: 464883 },
    { date: "2 Jul", stories: 23, engagement: 638245, reach: 512000 },
    { date: "3 Jul", stories: 18, engagement: 523000, reach: 445000 },
    { date: "4 Jul", stories: 15, engagement: 412000, reach: 398000 },
    { date: "5 Jul", stories: 14, engagement: 389000, reach: 376000 },
    { date: "6 Jul", stories: 11, engagement: 307209, reach: 334000 },
    { date: "7 Jul", stories: 16, engagement: 413000, reach: 423000 },
  ]

  const maxEngagement = Math.max(...dailyData.map((d) => d.engagement))

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Daily Story Performance</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {dailyData.map((day, index) => {
          const height = (day.engagement / maxEngagement) * 100
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg transition-all duration-1000"
                style={{
                  height: animated ? `${Math.max(height, 10)}%` : "0%",
                  transitionDelay: `${index * 100}ms`,
                }}
              />
              <div className="text-xs mt-2 text-center">
                <div className="font-medium">{day.date}</div>
                <div className="text-purple-300">{day.stories} stories</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <div className="font-bold text-purple-400">447,191</div>
          <div className="opacity-70">Avg. Daily Engagement</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-pink-400">16.1</div>
          <div className="opacity-70">Avg. Stories per Day</div>
        </div>
      </div>
    </div>
  )
}

const StoryEngagementTypes = () => {
  const engagementTypes = [
    { type: "Close", percentage: 90, count: 2817302, color: "from-red-400 to-red-600" },
    { type: "Taps Forward", percentage: 6, count: 187802, color: "from-blue-400 to-blue-600" },
    { type: "Taps Back", percentage: 3, count: 93901, color: "from-green-400 to-green-600" },
    { type: "Reply", percentage: 1, count: 31330, color: "from-purple-400 to-purple-600" },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Story Engagement Breakdown</h3>
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
        <div className="text-2xl font-bold text-purple-400">3,130,335</div>
        <div className="text-sm opacity-70">Total Story Engagements</div>
      </div>
    </div>
  )
}

const StoryCompletionRates = () => {
  const completionData = [
    { date: "1 Jul", rate: 6.2, stories: 16 },
    { date: "2 Jul", rate: 4.05, stories: 23 },
    { date: "3 Jul", rate: 5.8, stories: 18 },
    { date: "4 Jul", rate: 6.7, stories: 15 },
    { date: "5 Jul", rate: 5.9, stories: 14 },
    { date: "6 Jul", rate: 6.1, stories: 11 },
    { date: "7 Jul", rate: 7.99, stories: 16 },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Story Completion Rates</h3>
      <div className="space-y-3">
        {completionData.map((day, index) => (
          <div key={day.date} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="font-medium">{day.date}</div>
              <div className="text-sm opacity-70">{day.stories} stories</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                  style={{
                    width: `${(day.rate / 8) * 100}%`,
                    transitionDelay: `${index * 100}ms`,
                  }}
                />
              </div>
              <div className="text-right min-w-12">
                <div className="font-bold text-green-400">{day.rate}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <div className="text-lg font-bold text-green-400">5.74%</div>
        <div className="text-sm opacity-70">Average completion rate</div>
      </div>
    </div>
  )
}

const StoryInsights = () => {
  const insights = [
    {
      title: "Peak Story Time",
      value: "2 PM - 6 PM",
      description: "Highest engagement window",
      icon: "⏰",
    },
    {
      title: "Best Story Type",
      value: "Behind-the-scenes",
      description: "Highest completion rates",
      icon: "🎬",
    },
    {
      title: "Optimal Length",
      value: "15-20 seconds",
      description: "Best retention rates",
      icon: "⏱️",
    },
    {
      title: "Top Hashtag",
      value: "#xuxopatisserie",
      description: "Most story mentions",
      icon: "#️⃣",
    },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Story Insights</h3>
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

export default function StoryAnalytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Story Analytics</h2>
        <p className="text-purple-200">Track your Instagram Stories performance</p>
      </div>

      {/* Key Metrics */}
      <StoryMetricsOverview />

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StoryEngagementChart />
        <StoryEngagementTypes />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StoryCompletionRates />
        <StoryInsights />
      </div>

      {/* Story Publishing Pattern */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-6">Story Publishing Pattern</h3>
        <div className="grid grid-cols-7 gap-2">
          {[
            { day: "Mon", stories: 16, peak: false },
            { day: "Tue", stories: 18, peak: false },
            { day: "Wed", stories: 15, peak: false },
            { day: "Thu", stories: 14, peak: false },
            { day: "Fri", stories: 16, peak: false },
            { day: "Sat", stories: 23, peak: true },
            { day: "Sun", stories: 11, peak: false },
          ].map((dayData, index) => (
            <div key={dayData.day} className="text-center">
              <div className="text-sm font-medium mb-2">{dayData.day}</div>
              <div className="h-24 bg-white/10 rounded-lg flex items-end justify-center p-2">
                <div
                  className={`w-full rounded transition-all duration-1000 ${
                    dayData.peak
                      ? "bg-gradient-to-t from-pink-500 to-rose-400"
                      : "bg-gradient-to-t from-purple-500 to-indigo-400"
                  }`}
                  style={{ height: `${(dayData.stories / 23) * 100}%` }}
                />
              </div>
              <div className="text-xs mt-2">
                <div className="font-medium">{dayData.stories}</div>
                <div className="opacity-70">stories</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-sm opacity-70">
          Saturday shows highest story activity with 23 stories published
        </div>
      </div>
    </div>
  )
}
