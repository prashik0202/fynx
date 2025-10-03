import Header from '@/components/global/Header';
import { useAuthMiddleware } from '@/store/authstore'
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRouteProvider = () => {

  const { isAuthenticated } = useAuthMiddleware();

  if(!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <div className='min-h-screen flex flex-col w-full gap-5 items-center'>
      <Header />
      <Outlet />
    </div>
  )
}

export default ProtectedRouteProvider