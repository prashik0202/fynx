import { apiService } from "@/config/axiosConfig";
import type { SignInInput, SignUpInput, VerifyEmailInput } from "@/schema/authSchema";
import type { UserSignInRes, UserSignUpRes, UserVerifyOtp } from "@/types";

export const AuthService = {
  signUp: async (data: SignUpInput) => {
    return apiService.post<UserSignUpRes>('/auth/signup', data);
  },
  signIn: async (data: SignInInput) => {
    return apiService.post<UserSignInRes>('/auth/signin', data);
  },
  verifyEmail: async (data: VerifyEmailInput) => {
    return apiService.post<UserVerifyOtp>('/auth/verify', data);
  },
  logOut: async () => {
    return apiService.post('/auth/logout');
  }
};