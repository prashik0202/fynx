import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import AuthLayout from './pages/auth/AuthLayout';
import VerificationPage from './pages/auth/VerificationPage';
import UserProfilePage from './pages/dashboard/profile/UserProfilePage';
import ProtectedRouteProvider from './provider/ProtectedRouteProvider';
import HomePage from './pages/home/HomePage';
import HomePageLayout from './pages/home/HomePageLayout';
import DashboardHomePage from './pages/dashboard/home/DashboardHomePage';
import FeedbackPage from './pages/dashboard/feedback/FeedbackPage';
import ReportPage from './pages/dashboard/report/ReportPage';

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
          <Route path='/settings' element={<UserProfilePage />} />
          <Route path='/home' element={<DashboardHomePage />} />
          <Route path='/feedback' element={<FeedbackPage />} />
          <Route path='/report' element={<ReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App