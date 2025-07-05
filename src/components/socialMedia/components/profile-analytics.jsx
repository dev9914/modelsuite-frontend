"use client"

const ProfileMetricsOverview = () => {
  const metrics = [
    { label: "Profile Views", value: "125,375", change: "+18%", icon: "👁️", color: "from-blue-500 to-cyan-600" },
    {
      label: "Profile Engagements",
      value: "13,448",
      change: "+25%",
      icon: "🔗",
      color: "from-green-500 to-emerald-600",
    },
    { label: "Website Clicks", value: "2,689", change: "+20%", icon: "🌐", color: "from-purple-500 to-indigo-600" },
    { label: "Following", value: "36", change: "+9", icon: "➕", color: "from-orange-500 to-red-600" },
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

const ProfileViewsChart = () => {
  const dailyViews = [
    { date: "1 Jul", views: 17962, day: "Mon" },
    { date: "2 Jul", views: 19924, day: "Tue" },
    { date: "3 Jul", views: 18456, day: "Wed" },
    { date: "4 Jul", views: 17234, day: "Thu" },
    { date: "5 Jul", views: 16789, day: "Fri" },
    { date: "6 Jul", views: 15477, day: "Sat" },
    { date: "7 Jul", views: 18533, day: "Sun" },
  ]

  const maxViews = Math.max(...dailyViews.map((d) => d.views))

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Daily Profile Views</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {dailyViews.map((day, index) => {
          const height = (day.views / maxViews) * 100
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg transition-all duration-1000"
                style={{
                  height: `${Math.max(height, 10)}%`,
                  transitionDelay: `${index * 100}ms`,
                }}
              />
              <div className="text-xs mt-2 text-center">
                <div className="font-medium">{day.day}</div>
                <div className="text-blue-300">{(day.views / 1000).toFixed(1)}k</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="font-bold text-green-400">19,924</div>
          <div className="opacity-70">Highest (Tue)</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-blue-400">17,962</div>
          <div className="opacity-70">Average Daily</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-orange-400">15,477</div>
          <div className="opacity-70">Lowest (Sat)</div>
        </div>
      </div>
    </div>
  )
}

const ProfileEngagementBreakdown = () => {
  const engagementTypes = [
    { type: "Website Clicks", percentage: 20, count: 2689, color: "from-purple-400 to-indigo-500", icon: "🌐" },
    { type: "Phone Calls", percentage: 67, count: 9010, color: "from-green-400 to-emerald-500", icon: "📞" },
    { type: "Email Contacts", percentage: 13, count: 1749, color: "from-blue-400 to-cyan-500", icon: "📧" },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Profile Engagement Breakdown</h3>
      <div className="space-y-4">
        {engagementTypes.map((type, index) => (
          <div key={type.type} className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium flex items-center gap-2">
              <span>{type.icon}</span>
              <span>{type.type}</span>
            </div>
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
        <div className="text-2xl font-bold text-purple-400">13,448</div>
        <div className="text-sm opacity-70">Total Profile Engagements</div>
      </div>
    </div>
  )
}

const FollowingGrowth = () => {
  const followingData = [
    { date: "1 Jul", following: 30, growth: 1 },
    { date: "2 Jul", following: 31, growth: 1 },
    { date: "3 Jul", following: 32, growth: 1 },
    { date: "4 Jul", following: 38, growth: 6 },
    { date: "5 Jul", following: 40, growth: 2 },
    { date: "6 Jul", following: 42, growth: 2 },
    { date: "7 Jul", following: 36, growth: -6 },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Following Activity</h3>
      <div className="space-y-3">
        {followingData.map((day, index) => (
          <div key={day.date} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="font-medium">{day.date}</div>
              <div
                className={`px-2 py-1 rounded-full text-xs ${
                  day.growth > 0
                    ? "bg-green-500/20 text-green-400"
                    : day.growth < 0
                      ? "bg-red-500/20 text-red-400"
                      : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {day.growth > 0 ? `+${day.growth}` : day.growth}
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-purple-400">{day.following}</div>
              <div className="text-xs opacity-70">following</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-center">
        <div>
          <div className="font-bold text-green-400">+6</div>
          <div className="opacity-70">Highest Growth</div>
        </div>
        <div>
          <div className="font-bold text-blue-400">1.28</div>
          <div className="opacity-70">Avg. Daily</div>
        </div>
        <div>
          <div className="font-bold text-orange-400">36</div>
          <div className="opacity-70">Current Total</div>
        </div>
      </div>
    </div>
  )
}

const UserActivities = () => {
  const activities = [
    { hour: "00", activity: 203 },
    { hour: "01", activity: 57 },
    { hour: "02", activity: 123 },
    { hour: "03", activity: 117 },
    { hour: "04", activity: 227 },
    { hour: "05", activity: 116 },
    { hour: "06", activity: 223 },
    { hour: "07", activity: 246 },
    { hour: "08", activity: 357 },
    { hour: "09", activity: 456 },
    { hour: "10", activity: 388 },
    { hour: "11", activity: 299 },
    { hour: "12", activity: 511 },
    { hour: "13", activity: 533 },
    { hour: "14", activity: 421 },
    { hour: "15", activity: 516 },
    { hour: "16", activity: 557 },
    { hour: "17", activity: 514 },
    { hour: "18", activity: 429 },
    { hour: "19", activity: 303 },
    { hour: "20", activity: 242 },
    { hour: "21", activity: 170 },
    { hour: "22", activity: 158 },
    { hour: "23", activity: 76 },
  ]

  const maxActivity = Math.max(...activities.map((a) => a.activity))

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Hourly User Activities</h3>
      <div className="grid grid-cols-12 gap-1">
        {activities.map((hour, index) => (
          <div key={hour.hour} className="text-center">
            <div className="h-20 bg-white/10 rounded flex items-end justify-center p-1">
              <div
                className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded transition-all duration-1000"
                style={{
                  height: `${(hour.activity / maxActivity) * 100}%`,
                  transitionDelay: `${index * 50}ms`,
                }}
              />
            </div>
            <div className="text-xs mt-1">{hour.hour}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-sm opacity-70">Peak activity: 16:00-17:00 (557 activities)</div>
    </div>
  )
}

const ProfileInsights = () => {
  const insights = [
    {
      title: "Best View Time",
      value: "2 PM - 6 PM",
      description: "Peak profile viewing hours",
      icon: "⏰",
    },
    {
      title: "Top Traffic Source",
      value: "Instagram Feed",
      description: "78% of profile visits",
      icon: "📱",
    },
    {
      title: "Engagement Rate",
      value: "10.7%",
      description: "Views to engagement ratio",
      icon: "📊",
    },
    {
      title: "Return Visitors",
      value: "34%",
      description: "Repeat profile viewers",
      icon: "🔄",
    },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Profile Insights</h3>
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

export default function ProfileAnalytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Profile Analytics</h2>
        <p className="text-purple-200">Monitor your Instagram profile performance</p>
      </div>

      {/* Key Metrics */}
      <ProfileMetricsOverview />

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileViewsChart />
        <ProfileEngagementBreakdown />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FollowingGrowth />
        <ProfileInsights />
      </div>

      {/* User Activities */}
      <UserActivities />

      {/* Profile Summary */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-6">Profile Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">Tuesday</div>
            <div className="text-sm opacity-70">Best View Day</div>
            <div className="text-xs text-blue-300 mt-1">19,924 views</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">67%</div>
            <div className="text-sm opacity-70">Phone Calls</div>
            <div className="text-xs text-green-300 mt-1">Most common action</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">+25%</div>
            <div className="text-sm opacity-70">Engagement Growth</div>
            <div className="text-xs text-purple-300 mt-1">vs last week</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">16-17h</div>
            <div className="text-sm opacity-70">Peak Activity</div>
            <div className="text-xs text-orange-300 mt-1">557 activities</div>
          </div>
        </div>
      </div>
    </div>
  )
}
