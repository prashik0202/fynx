export type User = {
  id: string;
  email: string;
  name: string;
}

export type ErrorResponse = {
  message: string;
  error: string;
}

export type UserSignUpRes = {
  message: string;
  userId: string;
}

export type UserVerifyOtp = UserSignUpRes;
export type UserSignInRes = UserSignUpRes;

export type ErrorResponse = {
  success: boolean;
  error: string;
  message: string;
}