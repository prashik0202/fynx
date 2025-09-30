import { NextFunction, Request, Response } from "express";
import { AuthService } from '../services/auth.service';
import { CreationAttributes } from "sequelize";
import { User } from "../models";
import { setAuthCookies } from "../utils/cookies";
import { generateAccessToken, verifyToken } from "../utils/jwt";
import { ValidationError } from "../errors/customError";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.signupController = this.signupController.bind(this);
    this.verifyOtpController = this.verifyOtpController.bind(this);
    this.signInController = this.signInController.bind(this);
    this.logoutController = this.logoutController.bind(this);
  }

  async signupController(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, hashedPassword, name  } = req.body as CreationAttributes<User>;

      const { user, otp  } = await this.authService.signUpUser({email, hashedPassword, name });

      // send the otp via email not in response
      return res.status(201).json({
        message: "User created. Please verify OTP sent to your email.",
        userId: user.id,
        debugOtp: process.env.NODE_ENV !== "production" ? otp : undefined,
      });

    } catch (error) {
      next(error);
    }
  }

  async verifyOtpController(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, otp } = req.body;

      const { accessToken, refreshToken, user  } = await this.authService.verifySignUp(userId, otp);
      setAuthCookies(res, accessToken, refreshToken);

      return res.status(200).json({ message: "User verified successfully", userId: user.id });
    } catch (error) {
      next(error);
    }
  }

  async signInController(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, hashedPassword  } = req.body as Omit<CreationAttributes<User>, "name">;
      
      const { accessToken, refreshToken, user } = await this.authService.signInUser({ email, hashedPassword });
      setAuthCookies(res, accessToken, refreshToken);

      return res.status(200).json({ message: "User signed in successfully", userId: user.id });
    } catch (error) {
      next(error);
    }
  }

  async logoutController(req: Request, res: Response) {
    // clear cookies
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "Signed out successfully" });
  }

  async refreshTokenController(req: Request, res: Response, next: NextFunction) { 
    try {
      const refreshToken = req.cookies['refresh_token'];
      if(!refreshToken) {
        throw new ValidationError('Missing required fields');
      }

      const payload = verifyToken<{ userId : string }>(refreshToken);

      const accessToken = generateAccessToken(payload.userId);

      res.cookie("access_token",accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      return res.status(200).json({ message : "Access token refreshed successfully" });
    } catch (error) {
      return next(error);
    }
  }
}