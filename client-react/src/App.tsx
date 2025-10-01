import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import AuthLayout from './pages/auth/AuthLayout';
import VerificationPage from './pages/auth/VerificationPage';
import UserProfilePage from './pages/dashboard/profile/UserProfilePage';
import ProtectedRouteProvider from './provider/ProtectedRouteProvider';
import HomePage from './pages/home/HomePage';
import HomePageLayout from './pages/home/HomePageLayout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePageLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="verify" element={<VerificationPage />} />
        </Route>

        <Route element={<ProtectedRouteProvider />}>
          <Route path='/profile' element={<UserProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App