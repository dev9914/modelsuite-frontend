"use client"

import { useState } from "react"

const PostTypeBreakdown = () => {
  const postTypes = [
    { type: "Photo", count: 7, percentage: 35, color: "from-pink-400 to-rose-500", icon: "📷" },
    { type: "Video", count: 12, percentage: 55, color: "from-purple-400 to-indigo-500", icon: "🎥" },
    { type: "Carousel", count: 2, percentage: 10, color: "from-blue-400 to-cyan-500", icon: "🎠" },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Post Type Distribution</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {postTypes.map((type) => (
          <div key={type.type} className="text-center">
            <div
              className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${type.color} flex items-center justify-center text-2xl`}
            >
              {type.icon}
            </div>
            <div className="text-2xl font-bold">{type.count}</div>
            <div className="text-sm opacity-70">{type.type}</div>
            <div className="text-xs text-purple-300">{type.percentage}%</div>
          </div>
        ))}
      </div>
      <div className="text-center text-sm opacity-70">Total: 21 posts published this week</div>
    </div>
  )
}

const EngagementMetrics = () => {
  const metrics = [
    { label: "Likes", value: 22730, change: "+12%", color: "text-red-400", icon: "❤️" },
    { label: "Comments", value: 5562, change: "+8.4%", color: "text-blue-400", icon: "💬" },
    { label: "Saves", value: 1145, change: "+15%", color: "text-green-400", icon: "🔖" },
    { label: "Shares", value: 2684, change: "+22%", color: "text-yellow-400", icon: "📤" },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Engagement Breakdown</h3>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{metric.icon}</div>
              <div>
                <div className="font-medium">{metric.label}</div>
                <div className="text-sm opacity-70">Total engagements</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-xl font-bold ${metric.color}`}>{metric.value.toLocaleString()}</div>
              <div className="text-sm text-green-400">{metric.change}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">29,437</div>
          <div className="text-sm opacity-70">Total Post Engagements</div>
          <div className="text-xs text-green-400 mt-1">+36.9% vs previous period</div>
        </div>
      </div>
    </div>
  )
}

const TopPerformingPosts = () => {
  const posts = [
    {
      id: 1,
      type: "Photo",
      description: "Chocolate brownie masterpiece",
      likes: 5954,
      comments: 1364,
      saves: 1059,
      engagement: 8377,
      date: "July 7",
    },
    {
      id: 2,
      type: "Video",
      description: "Cupcake decorating process",
      likes: 4312,
      comments: 892,
      saves: 756,
      engagement: 5960,
      date: "July 5",
    },
    {
      id: 3,
      type: "Carousel",
      description: "Macaron collection showcase",
      likes: 3856,
      comments: 654,
      saves: 432,
      engagement: 4942,
      date: "July 3",
    },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Top Performing Posts</h3>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={post.id} className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-sm font-bold">
                  #{index + 1}
                </div>
                <div>
                  <div className="font-medium">{post.description}</div>
                  <div className="text-sm opacity-70">
                    {post.type} • {post.date}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-purple-400">{post.engagement.toLocaleString()}</div>
                <div className="text-xs opacity-70">Total Engagement</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-red-400">{post.likes.toLocaleString()}</div>
                <div className="opacity-70">Likes</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-blue-400">{post.comments.toLocaleString()}</div>
                <div className="opacity-70">Comments</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-green-400">{post.saves.toLocaleString()}</div>
                <div className="opacity-70">Saves</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const HashtagAnalysis = () => {
  const hashtags = [
    { tag: "#xuxopatisserie", posts: 21, engagement: 29437, avgEngagement: 1402 },
    { tag: "#brownie", posts: 4, engagement: 3215, avgEngagement: 804 },
    { tag: "#cupcake", posts: 20, engagement: 19715, avgEngagement: 986 },
    { tag: "#chocolate", posts: 2, engagement: 1577, avgEngagement: 789 },
    { tag: "#patisserie", posts: 4, engagement: 4547, avgEngagement: 1137 },
    { tag: "#macaron", posts: 2, engagement: 3330, avgEngagement: 1665 },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Hashtag Performance</h3>
      <div className="space-y-3">
        {hashtags.map((hashtag, index) => (
          <div key={hashtag.tag} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="text-purple-400 font-mono font-medium">{hashtag.tag}</div>
              <div className="text-sm opacity-70">{hashtag.posts} posts</div>
            </div>
            <div className="text-right">
              <div className="font-medium">{hashtag.avgEngagement.toLocaleString()}</div>
              <div className="text-xs opacity-70">Avg. engagement</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PostPerformance() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Post Performance</h2>
          <p className="text-purple-200">Analyzing your content engagement</p>
        </div>
        <div className="mt-4 md:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="text-3xl mb-2">📝</div>
          <h3 className="text-lg font-medium opacity-90 mb-2">Total Posts</h3>
          <p className="text-3xl font-bold">21</p>
          <p className="text-sm opacity-80 mt-2">+4.5% from last week</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
          <div className="text-3xl mb-2">👁️</div>
          <h3 className="text-lg font-medium opacity-90 mb-2">Avg. Reach</h3>
          <p className="text-3xl font-bold">370K</p>
          <p className="text-sm opacity-80 mt-2">Per post</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="text-lg font-medium opacity-90 mb-2">Engagement Rate</h3>
          <p className="text-3xl font-bold">0.84%</p>
          <p className="text-sm opacity-80 mt-2">+5% increase</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="text-3xl mb-2">🔥</div>
          <h3 className="text-lg font-medium opacity-90 mb-2">Best Day</h3>
          <p className="text-3xl font-bold">Thu</p>
          <p className="text-sm opacity-80 mt-2">July 7th</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PostTypeBreakdown />
        <EngagementMetrics />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPerformingPosts />
        <HashtagAnalysis />
      </div>

      {/* Publishing Schedule */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-6">Publishing Schedule Analysis</h3>
        <div className="grid grid-cols-7 gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
            const posts = [2, 3, 4, 2, 3, 4, 3][index]
            return (
              <div key={day} className="text-center">
                <div className="text-sm font-medium mb-2">{day}</div>
                <div className="h-20 bg-white/10 rounded-lg flex items-end justify-center p-2">
                  <div
                    className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded transition-all duration-1000"
                    style={{ height: `${(posts / 4) * 100}%` }}
                  />
                </div>
                <div className="text-xs mt-2 opacity-70">{posts} posts</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
