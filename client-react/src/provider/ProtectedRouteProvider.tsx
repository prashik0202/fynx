import { useAuthMiddleware } from '@/store/authstore'
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRouteProvider = () => {

  const { isAuthenticated } = useAuthMiddleware();

  if(!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <Outlet />
  )
}

export default ProtectedRouteProvider