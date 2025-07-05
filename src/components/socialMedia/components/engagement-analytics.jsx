"use client"

const EngagementOverview = () => {
  const metrics = [
    { label: "Total Engagements", value: "152", change: "+36.9%", icon: "🔥", color: "from-orange-500 to-red-600" },
    { label: "Engagement Rate", value: "0.84%", change: "+5%", icon: "📈", color: "from-green-500 to-emerald-600" },
    { label: "Avg. per Post", value: "1,402", change: "+12%", icon: "📊", color: "from-blue-500 to-cyan-600" },
    { label: "Peak Day", value: "Thursday", change: "July 7th", icon: "⭐", color: "from-purple-500 to-indigo-600" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={metric.label} className={`bg-gradient-to-br ${metric.color} rounded-2xl p-6 text-white`}>
          <div className="text-3xl mb-2">{metric.icon}</div>
          <h3 className="text-lg font-medium opacity-90 mb-2">{metric.label}</h3>
          <p className="text-3xl font-bold">{metric.value}</p>
          <p className="text-sm opacity-80 mt-2">{metric.change}</p>
        </div>
      ))}
    </div>
  )
}

const EngagementTypeDistribution = () => {
  const engagementTypes = [
    { type: "Likes", count: 31, percentage: 77, color: "from-red-400 to-pink-500", icon: "❤️" },
    { type: "Comments", count: 56, percentage: 19, color: "from-blue-400 to-cyan-500", icon: "💬" },
    { type: "Saves", count: 24, percentage: 4, color: "from-green-400 to-emerald-500", icon: "🔖" },
    { type: "Shares", count: 41, percentage: 0, color: "from-purple-400 to-indigo-500", icon: "📤" },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Engagement Type Distribution</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {engagementTypes.map((type, index) => (
          <div key={type.type} className="text-center p-4 bg-white/5 rounded-xl">
            <div className="text-3xl mb-2">{type.icon}</div>
            <div className="text-2xl font-bold">{type.count}</div>
            <div className="text-sm opacity-70">{type.type}</div>
            <div className="text-xs text-purple-300 mt-1">{type.percentage}%</div>
          </div>
        ))}
      </div>

      {/* Engagement Distribution Bar */}
      <div className="space-y-3">
        {engagementTypes.map((type, index) => (
          <div key={type.type} className="flex items-center gap-4">
            <div className="w-16 text-sm font-medium flex items-center gap-2">
              <span>{type.icon}</span>
              <span>{type.type}</span>
            </div>
            <div className="flex-1">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className={`bg-gradient-to-r ${type.color} h-3 rounded-full transition-all duration-1000`}
                  style={{
                    width: `${Math.max(type.percentage, 5)}%`,
                    transitionDelay: `${index * 200}ms`,
                  }}
                />
              </div>
            </div>
            <div className="text-sm font-medium w-12 text-right">{type.count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ContentTypeEngagement = () => {
  const contentTypes = [
    { type: "Posts", likes: 22730, comments: 5562, saves: 1145, shares: 2684, total: 32121 },
    { type: "Stories", likes: 0, comments: 0, saves: 0, shares: 0, total: 3130335 },
    { type: "Reels", likes: 16952, comments: 1695, saves: 188, shares: 0, total: 18835 },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Engagement by Content Type</h3>
      <div className="space-y-6">
        {contentTypes.map((content, index) => (
          <div key={content.type} className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">{content.type}</h4>
              <div className="text-xl font-bold text-purple-400">{content.total.toLocaleString()}</div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-red-400">{content.likes.toLocaleString()}</div>
                <div className="opacity-70">Likes</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-blue-400">{content.comments.toLocaleString()}</div>
                <div className="opacity-70">Comments</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-green-400">{content.saves.toLocaleString()}</div>
                <div className="opacity-70">Saves</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-yellow-400">{content.shares.toLocaleString()}</div>
                <div className="opacity-70">Shares</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const TopEngagers = () => {
  const topCommenters = [
    { username: "@yolanda.barrueco86", messages: 1703, avatar: "👩" },
    { username: "@akachi_va123", messages: 846, avatar: "👨" },
    { username: "@nadine.p2000", messages: 209, avatar: "👩" },
    { username: "@lungelo_ngcabaaa", messages: 156, avatar: "👨" },
    { username: "@antoninnn_h555", messages: 59, avatar: "👩" },
  ]

  const topLikers = [
    { username: "@rik.kann_ny", likes: 1027, avatar: "👨" },
    { username: "@this.heather.c", likes: 859, avatar: "👩" },
    { username: "@akachi_va123", likes: 612, avatar: "👨" },
    { username: "@sebastian.westergren1", likes: 544, avatar: "👨" },
    { username: "@jordanna.kkitchener", likes: 86, avatar: "👩" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Commenters */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-6">Most Active Commenters</h3>
        <div className="space-y-3">
          {topCommenters.map((user, index) => (
            <div key={user.username} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-sm">
                  {user.avatar}
                </div>
                <div>
                  <div className="font-medium text-sm">{user.username}</div>
                  <div className="text-xs opacity-70">Active commenter</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-400">{user.messages}</div>
                <div className="text-xs opacity-70">messages</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Likers */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-6">Most Active Likers</h3>
        <div className="space-y-3">
          {topLikers.map((user, index) => (
            <div key={user.username} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center text-sm">
                  {user.avatar}
                </div>
                <div>
                  <div className="font-medium text-sm">{user.username}</div>
                  <div className="text-xs opacity-70">Active liker</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-red-400">{user.likes}</div>
                <div className="text-xs opacity-70">likes</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const EngagementTrends = () => {
  const dailyEngagement = [
    { date: "1 Jul", engagement: 2391, type: "high" },
    { date: "2 Jul", engagement: 2156, type: "high" },
    { date: "3 Jul", engagement: 1876, type: "medium" },
    { date: "4 Jul", engagement: 1654, type: "medium" },
    { date: "5 Jul", engagement: 1923, type: "medium" },
    { date: "6 Jul", engagement: 1473, type: "low" },
    { date: "7 Jul", engagement: 2234, type: "high" },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Daily Engagement Trends</h3>
      <div className="space-y-3">
        {dailyEngagement.map((day, index) => (
          <div key={day.date} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="font-medium">{day.date}</div>
              <div
                className={`px-2 py-1 rounded-full text-xs ${
                  day.type === "high"
                    ? "bg-green-500/20 text-green-400"
                    : day.type === "medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                }`}
              >
                {day.type}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    day.type === "high"
                      ? "bg-gradient-to-r from-green-400 to-emerald-500"
                      : day.type === "medium"
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                        : "bg-gradient-to-r from-red-400 to-pink-500"
                  }`}
                  style={{
                    width: `${(day.engagement / 2500) * 100}%`,
                    transitionDelay: `${index * 100}ms`,
                  }}
                />
              </div>
              <div className="text-right min-w-16">
                <div className="font-bold">{day.engagement.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <div className="text-lg font-bold text-purple-400">1,921</div>
        <div className="text-sm opacity-70">Average daily engagement</div>
      </div>
    </div>
  )
}

export default function EngagementAnalytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Engagement Analytics</h2>
        <p className="text-purple-200">Deep dive into your audience interactions</p>
      </div>

      {/* Key Metrics */}
      <EngagementOverview />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EngagementTypeDistribution />
        <ContentTypeEngagement />
      </div>

      {/* Top Engagers */}
      <TopEngagers />

      {/* Engagement Trends */}
      <EngagementTrends />

      {/* Summary Insights */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-6">Engagement Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">Friday</div>
            <div className="text-sm opacity-70">Best Engagement Day</div>
            <div className="text-xs text-green-300 mt-1">2,391 total engagements</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">77%</div>
            <div className="text-sm opacity-70">Likes Dominance</div>
            <div className="text-xs text-blue-300 mt-1">Most common interaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">+36.9%</div>
            <div className="text-sm opacity-70">Growth Rate</div>
            <div className="text-xs text-purple-300 mt-1">vs previous period</div>
          </div>
        </div>
      </div>
    </div>
  )
}
