import DashBoardLayout from '@/pages/dashboard/DashBoardLayout';
import { useAuthMiddleware } from '@/store/authstore'
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRouteProvider = () => {

  const { isAuthenticated } = useAuthMiddleware();

  if(!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <DashBoardLayout>
      <Outlet />
    </DashBoardLayout>
  )
}

export default ProtectedRouteProvider