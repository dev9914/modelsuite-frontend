import { Routes, Route } from 'react-router-dom'
import Register from './pages/Model/Register'
import ModelDashboard from './pages/Model/Dashboard'
import Login from './pages/Model/Login'
import AgencyRegister from './pages/Agency/Register'
import AgencyDashboard from './pages/Agency/Dashboard'
import AgencyLogin from './pages/Agency/Login'
import Home from './pages/Home/Home'
import CreatorInsightsDashboard from './pages/Agency/ModelView'
import AgencyLayout from './layouts/AgencyLayout' // ⬅️ Layout that wraps Sidebar + Outlet
import ModelLayout from './layouts/ModelLayout'
import ProtectedRoute from './utils/ProtectedRoute'
function App() {
  return (
    <Routes>
  {/* Public routes */}
  <Route path="/" element={<Home />} />
  <Route path="/model/login" element={<Login />} />
  <Route path="/model/register" element={<Register />} />
  <Route path="/agency/login" element={<AgencyLogin />} />
  <Route path="/agency/register" element={<AgencyRegister />} />

  {/* Protected model routes */}
  <Route element={<ProtectedRoute allowedRole="model" />}>
    <Route element={<ModelLayout />}>
      <Route path="/model/dashboard" element={<ModelDashboard />} />
    </Route>
  </Route>

  {/* Protected agency routes */}
  <Route element={<ProtectedRoute allowedRole="agency" />}>
    <Route element={<AgencyLayout />}>
      <Route path="/agency/dashboard" element={<AgencyDashboard />} />
      <Route path="/agency/model-view/:id" element={<CreatorInsightsDashboard />} />
    </Route>
  </Route>
</Routes>
  )
}

export default App
