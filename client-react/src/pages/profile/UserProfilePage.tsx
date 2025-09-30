import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthService } from '@/service/auth.service';
import { ProfileService } from '@/service/profile.service';
import { useAuthMiddleware } from '@/store/authstore';
import type { User } from '@/types';
import { useEffect, useState } from 'react'

const UserProfilePage = () => {

  const { logout } = useAuthMiddleware();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUserData = async() => {
      try {
        const response = await ProfileService.getUserData();
        console.log(response.data);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserData();
  },[]);


  const handleLogout = async() => {
    await AuthService.logOut();
    logout();
  }

  return (
    <div className='min-h-dvh flex flex-col items-center justify-center'>
      {user && (
        <Card className='shadow-md w-full md:max-w-3xl'>
          <CardHeader>
            <CardTitle>
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <Button variant={"destructive"} onClick={handleLogout} className='w-fit'>Logout</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default UserProfilePage