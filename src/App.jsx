import { Routes, Route } from 'react-router-dom'
import Register from './pages/Model/Register'
import Dashboard from './pages/Model/Dashboard'
import Login from './pages/Model/Login'
import AgencyRegister from './pages/Agency/Register'
import AgencyDashboard from './pages/Agency/Dashboard'
import AgencyLogin from './pages/Agency/Login'
import Home from './pages/Home/Home'
import CreatorInsightsDashboard from './pages/Agency/ModelView'
import Layout from './components/Layout' // ⬅️ Layout that wraps Sidebar + Outlet

function App() {
  return (
    <Routes>
      {/* Pages without sidebar */}
      <Route path="/" element={<Home />} />
      <Route path="/model/login" element={<Login />} />
      <Route path="/model/register" element={<Register />} />
      <Route path="/agency/login" element={<AgencyLogin />} />
      <Route path="/agency/register" element={<AgencyRegister />} />

      {/* Pages with sidebar using Layout */}
      <Route path="/model" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/agency" element={<Layout />}>
        <Route path="dashboard" element={<AgencyDashboard />} />
        <Route path="model-view/:id" element={<CreatorInsightsDashboard />} />
      </Route>
    </Routes>
  )
}

export default App
