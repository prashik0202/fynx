import { useAuthMiddleware } from "@/store/authstore";
import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {

   const { isAuthenticated } = useAuthMiddleware();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />; // redirect home (or dashboard)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <Outlet />
    </div>
  )
}

export default AuthLayout