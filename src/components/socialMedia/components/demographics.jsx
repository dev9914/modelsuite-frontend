
import { useState, useEffect } from "react"

const AgeGenderChart = () => {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const ageGroups = [
    { age: "13-17", male: 2, female: 3 },
    { age: "18-24", male: 8, female: 12 },
    { age: "25-34", male: 15, female: 25 },
    { age: "35-44", male: 12, female: 18 },
    { age: "45-54", male: 8, female: 12 },
    { age: "55-64", male: 4, female: 6 },
    { age: "65+", male: 1, female: 2 },
  ]

  const genderStats = {
    female: 50,
    male: 36,
    unspecified: 14,
  }

  return (
    <div className="space-y-6">
      {/* Gender Distribution */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-6">Gender Distribution</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-2xl">
              👩
            </div>
            <div className="text-2xl font-bold text-pink-400">{genderStats.female}%</div>
            <div className="text-sm opacity-70">Female</div>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-2xl">
              👨
            </div>
            <div className="text-2xl font-bold text-blue-400">{genderStats.male}%</div>
            <div className="text-sm opacity-70">Male</div>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-2xl">
              ❓
            </div>
            <div className="text-2xl font-bold text-gray-400">{genderStats.unspecified}%</div>
            <div className="text-sm opacity-70">Unspecified</div>
          </div>
        </div>

        {/* Gender Bar */}
        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full flex">
            <div
              className="bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-1000"
              style={{ width: animated ? `${genderStats.female}%` : "0%" }}
            />
            <div
              className="bg-gradient-to-r from-blue-400 to-cyan-500 transition-all duration-1000"
              style={{ width: animated ? `${genderStats.male}%` : "0%", transitionDelay: "200ms" }}
            />
            <div
              className="bg-gradient-to-r from-gray-400 to-gray-500 transition-all duration-1000"
              style={{ width: animated ? `${genderStats.unspecified}%` : "0%", transitionDelay: "400ms" }}
            />
          </div>
        </div>
      </div>

      {/* Age Distribution */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-6">Age & Gender Distribution</h3>
        <div className="space-y-4">
          {ageGroups.map((group, index) => (
            <div key={group.age} className="flex items-center gap-4">
              <div className="w-16 text-sm font-medium">{group.age}</div>
              <div className="flex-1 flex items-center gap-2">
                {/* Female bar */}
                <div className="flex-1 bg-gray-700 rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-1000 flex items-center justify-end pr-2"
                    style={{
                      width: animated ? `${group.female * 4}%` : "0%",
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <span className="text-xs font-medium">{group.female}%</span>
                  </div>
                </div>
                <div className="w-8 text-center text-xs">👩</div>
                <div className="w-8 text-center text-xs">👨</div>
                {/* Male bar */}
                <div className="flex-1 bg-gray-700 rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 transition-all duration-1000 flex items-center justify-start pl-2"
                    style={{
                      width: animated ? `${group.male * 4}%` : "0%",
                      transitionDelay: `${index * 100 + 50}ms`,
                    }}
                  >
                    <span className="text-xs font-medium">{group.male}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const LocationAnalytics = () => {
  const countries = [
    { code: "GB", name: "United Kingdom", followers: 1789780, flag: "🇬🇧" },
    { code: "US", name: "United States", followers: 77985, flag: "🇺🇸" },
    { code: "DE", name: "Germany", followers: 76876, flag: "🇩🇪" },
    { code: "FR", name: "France", followers: 32166, flag: "🇫🇷" },
    { code: "TR", name: "Turkey", followers: 19600, flag: "🇹🇷" },
    { code: "ES", name: "Spain", followers: 19721, flag: "🇪🇸" },
    { code: "IT", name: "Italy", followers: 12417, flag: "🇮🇹" },
  ]

  const cities = [
    { name: "London", followers: 444342, country: "UK" },
    { name: "Brighton", followers: 112587, country: "UK" },
    { name: "Boston", followers: 110718, country: "US" },
    { name: "Bristol", followers: 79381, country: "UK" },
    { name: "Berlin", followers: 55328, country: "DE" },
    { name: "Paris", followers: 56475, country: "FR" },
    { name: "Cambridge", followers: 59400, country: "UK" },
  ]

  const maxCountryFollowers = Math.max(...countries.map((c) => c.followers))
  const maxCityFollowers = Math.max(...cities.map((c) => c.followers))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Countries */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-6">Top Countries</h3>
        <div className="space-y-4">
          {countries.map((country, index) => (
            <div key={country.code} className="flex items-center gap-4">
              <div className="text-2xl">{country.flag}</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{country.name}</span>
                  <span className="text-sm">{country.followers.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${(country.followers / maxCountryFollowers) * 100}%`,
                      transitionDelay: `${index * 100}ms`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cities */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-6">Top Cities</h3>
        <div className="space-y-4">
          {cities.map((city, index) => (
            <div key={city.name} className="flex items-center gap-4">
              <div className="text-2xl">🏙️</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{city.name}</span>
                  <span className="text-sm">{city.followers.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${(city.followers / maxCityFollowers) * 100}%`,
                      transitionDelay: `${index * 100}ms`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Demographics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Audience Demographics</h2>
        <p className="text-purple-200">Understanding your follower composition</p>
      </div>

      {/* Age & Gender */}
      <AgeGenderChart />

      {/* Location */}
      <LocationAnalytics />

      {/* Summary Stats */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-6">Demographic Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400">25-34</div>
            <div className="text-sm opacity-70">Most Active Age Group</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">🇬🇧</div>
            <div className="text-sm opacity-70">Top Country (62.8%)</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">London</div>
            <div className="text-sm opacity-70">Top City (15.6%)</div>
          </div>
        </div>
      </div>
    </div>
  )
}
