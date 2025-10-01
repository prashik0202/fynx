import { ThemeToggle } from '@/components/global/ThemeToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ProfileService } from '@/service/profile.service';
import { useQuery } from '@tanstack/react-query';

const UserProfilePage = () => {

  const {data,isLoading, error } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async() => await ProfileService.getUserData()
  });

  if(isLoading) {
    return(
      <div className='flex flex-col 3xl p-10 items-center gap-5'>
        <Skeleton className='w-full lg:max-w-1/2 bg-neutral-500 h-60' />
        <Skeleton className='w-full lg:max-w-1/2 bg-neutral-500 h-60' />
      </div>
    )
  }

  if(error) {
    return(
      <div>
        <span className='text-xl text-red-800 text-center'>Unable to load User Profile</span>
      </div>
    )
  }

  if(data) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <Card className='shadow-md w-full md:max-w-3xl'>
          <CardHeader>
            <CardTitle>
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            <span className='text-sm text-muted-foreground'>{data.data.user.name}</span>
            <span className='text-sm text-muted-foreground'>{data.data.user.email}</span>
            <ThemeToggle />
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default UserProfilePage