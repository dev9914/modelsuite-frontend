import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({ allowedRole }) => {
  const authData = JSON.parse(localStorage.getItem("auth"))
  const token = authData?.token
  const user = authData?.user

  if (!token || !user) {
    return <Navigate to="/" />
  }

  if (user.role !== allowedRole) {
    const redirectTo = user.role === "model" ? "/model/login" : "/agency/login"
    return <Navigate to={redirectTo} />
  }

  return <Outlet />
}

export default ProtectedRoute
