
import { Outlet } from 'react-router-dom'
import Header from '../../components/global/Header'

const HomePageLayout = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Header />
      <Outlet />
    </div>
  )
}

export default HomePageLayout