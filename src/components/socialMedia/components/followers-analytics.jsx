"use client"

import { useState, useEffect } from "react"

const FollowerGrowthChart = ({ data }) => {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const maxValue = Math.max(...data.map((d) => d.followers))
  const minValue = Math.min(...data.map((d) => d.followers))

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Follower Growth Trend</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {data.map((day, index) => {
          const height = ((day.followers - minValue) / (maxValue - minValue)) * 100
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-pink-500 to-purple-500 rounded-t-lg transition-all duration-1000"
                style={{
                  height: animated ? `${Math.max(height, 10)}%` : "0%",
                  transitionDelay: `${index * 100}ms`,
                }}
              />
              <div className="text-xs mt-2 text-center">
                <div className="font-medium">{day.date}</div>
                <div className="text-pink-300">+{day.growth}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 text-center">
        <div className="text-3xl font-bold text-pink-400">2,850,314</div>
        <div className="text-sm opacity-70">Total Followers by July 7, 2024</div>
      </div>
    </div>
  )
}

const GrowthStats = () => (
  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
    <h3 className="text-xl font-bold mb-6">Growth Statistics</h3>
    <div className="space-y-4">
      <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-xl">
        <div>
          <div className="text-sm opacity-70">Highest Growth</div>
          <div className="font-bold">Friday, July 1st</div>
        </div>
        <div className="text-2xl font-bold text-green-400">+621</div>
      </div>
      <div className="flex justify-between items-center p-4 bg-blue-500/20 rounded-xl">
        <div>
          <div className="text-sm opacity-70">Average Daily Growth</div>
          <div className="font-bold">Per Day</div>
        </div>
        <div className="text-2xl font-bold text-blue-400">+244</div>
      </div>
      <div className="flex justify-between items-center p-4 bg-orange-500/20 rounded-xl">
        <div>
          <div className="text-sm opacity-70">Lowest Growth</div>
          <div className="font-bold">Thursday, July 7th</div>
        </div>
        <div className="text-2xl font-bold text-orange-400">+198</div>
      </div>
      <div className="flex justify-between items-center p-4 bg-purple-500/20 rounded-xl">
        <div>
          <div className="text-sm opacity-70">Total Week Growth</div>
          <div className="font-bold">July 1-7, 2024</div>
        </div>
        <div className="text-2xl font-bold text-purple-400">+1,706</div>
      </div>
    </div>
  </div>
)

const OnlineFollowersHeatmap = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  // Dummy data for online followers heatmap
  const generateHeatmapData = () => {
    const data = {}
    days.forEach((day) => {
      data[day] = {}
      hours.forEach((hour) => {
        // Peak hours around 12-18 and 20-22
        let intensity = Math.random() * 0.3
        if (hour >= 12 && hour <= 18) intensity += 0.4
        if (hour >= 20 && hour <= 22) intensity += 0.3
        data[day][hour] = Math.min(intensity, 1)
      })
    })
    return data
  }

  const heatmapData = generateHeatmapData()

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Online Followers Heatmap</h3>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-25 gap-1 min-w-max">
          <div></div>
          {hours.map((hour) => (
            <div key={hour} className="text-xs text-center w-6 h-6 flex items-center justify-center">
              {hour}
            </div>
          ))}
          {days.map((day) => (
            <>
              <div key={day} className="text-xs flex items-center justify-center w-8 h-6">
                {day}
              </div>
              {hours.map((hour) => (
                <div
                  key={`${day}-${hour}`}
                  className="w-6 h-6 rounded-sm"
                  style={{
                    backgroundColor: `rgba(236, 72, 153, ${heatmapData[day][hour]})`,
                  }}
                />
              ))}
            </>
          ))}
        </div>
      </div>
      <div className="mt-4 text-sm opacity-70 text-center">Peak activity: 12-18h and 20-22h daily</div>
    </div>
  )
}

export default function FollowersAnalytics({accountInfo}) {
  const followerData = [
    { date: "1 Jul", followers: 2849693, growth: 621 },
    { date: "2 Jul", followers: 2849914, growth: 221 },
    { date: "3 Jul", followers: 2850135, growth: 221 },
    { date: "4 Jul", followers: 2850198, growth: 63 },
    { date: "5 Jul", followers: 2850256, growth: 58 },
    { date: "6 Jul", followers: 2850289, growth: 33 },
    { date: "7 Jul", followers: 2850314, growth: 25 },
  ]

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
          <div className="text-3xl mb-2">👥</div>
          <h3 className="text-lg font-medium opacity-90 mb-2">Current Followers</h3>
          <p className="text-3xl font-bold">{accountInfo.followers_count}</p>
          <p className="text-sm opacity-80 mt-2">As of July 7, 2024</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="text-3xl mb-2">📈</div>
          <h3 className="text-lg font-medium opacity-90 mb-2">Weekly Growth</h3>
          <p className="text-3xl font-bold">+1,706</p>
          <p className="text-sm opacity-80 mt-2">+0.1% increase</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="text-lg font-medium opacity-90 mb-2">Daily Average</h3>
          <p className="text-3xl font-bold">+244</p>
          <p className="text-sm opacity-80 mt-2">New followers per day</p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FollowerGrowthChart data={followerData} />
        <GrowthStats />
      </div>

      {/* Online Followers Heatmap */}
      <OnlineFollowersHeatmap />

      {/* Additional Insights */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-6">Follower Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Growth Pattern</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Strong start of week (Friday +621)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Steady mid-week growth
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                Slower end of week growth
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Key Metrics</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Retention Rate:</span>
                <span className="font-medium text-green-400">98.2%</span>
              </li>
              <li className="flex justify-between">
                <span>Unfollows:</span>
                <span className="font-medium text-red-400">1.8%</span>
              </li>
              <li className="flex justify-between">
                <span>Growth Rate:</span>
                <span className="font-medium text-blue-400">0.06%/day</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
