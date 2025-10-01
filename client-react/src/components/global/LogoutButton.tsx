import { Button } from '../ui/button'
import { AuthService } from '@/service/auth.service';
import { useAuthMiddleware } from '@/store/authstore';

const LogoutButton = () => {

  const { logout } = useAuthMiddleware();

  const handleLogout = async() => {
    await AuthService.logOut();
    logout();
  }

  return (
    <Button variant={"destructive"} onClick={handleLogout} className='w-fit'>Logout</Button>
  )
}

export default LogoutButton