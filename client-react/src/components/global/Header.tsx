import React from 'react';

import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { useAuthMiddleware } from '@/store/authstore';
import LogoutButton from './LogoutButton';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  
  const { isAuthenticated } = useAuthMiddleware();

  return (
    <header className='w-full flex justify-center p-3'>
      <div className='flex flex-row items-center justify-between gap-x-5 w-full lg:max-w-1/2'>
        <Link to="/" className='text-2xl'>Fynx</Link>
        <div className='flex flex-row gap-x-2'>
          {
            isAuthenticated ? (
              <React.Fragment>
                <LogoutButton />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button asChild className='hidden sm:inline-flex'>
                  <Link to="/auth/sign-up">Sign-Up</Link>
                </Button>
                <Button asChild variant={"ghost"}>
                  <Link to="/auth/sign-in">Sign-In</Link>
                </Button>
              </React.Fragment>
            )
          }
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header