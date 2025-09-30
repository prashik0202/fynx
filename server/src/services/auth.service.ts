import bcrypt from 'bcrypt';
import User from "../models/user.model";
import { CreationAttributes } from 'sequelize';
import { hashPassword } from '../utils/bcrypt';
import { OtpService } from './otp.service';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { AppError, NotFoundError, ValidationError } from '../errors/customError';
import { sendMail } from '../utils/sendEmail';
import { getVerifyEmailTemplate } from '../utils/emailTemplate';
import { AuthRepository } from '../repository/AuthRepository';

export class AuthService {

  private OTPService: OtpService;
  private authRepository: AuthRepository;

  constructor() {
    this.OTPService = new OtpService();
    this.authRepository = new AuthRepository();
  }

  /**
   * Creates a new user and generates an OTP for verification.
   * @param data - User creation attributes.
   * @returns The created user and OTP.
   */
  async signUpUser(data: CreationAttributes<User> ): Promise<{ user : User, otp: string } > {

    // check weather user already exists or not
    // if exists then throw error that user already exists
    const userExists = await this.authRepository.findByEmail(data.email);

    if (userExists) {
      throw new AppError('User already exists', 409);
    }

    // if user not exists already then we hash the userpassword and create the user
    const hashedPassword = await hashPassword(data.hashedPassword);

    const user = await this.authRepository.createUser({
      ...data,
      hashedPassword,
    })

    // Generate OTP for the user
    const otp = await this.OTPService.createOtpForUser(user.id);

    // send email accessor here
    await sendMail({
      to: user.email,
      subject: "PERN Auth: Verify your email",
      html: () => getVerifyEmailTemplate(otp, user.name)
    })

    return { user, otp };
  }


  /**
   * Verifies the user's sign-up using the provided OTP.
   * @param userId 
   * @param otp 
   * @returns user data, accessToken and refreshToken
   */
  async verifySignUp(userId: string, otp: string) : Promise<{ user: User, accessToken: string, refreshToken: string }> {

    // Verify the OTP
    const verification = await this.OTPService.verifyOtp(userId, otp);
    if(!verification) {
      throw new AppError('Invalid OTP or Expired Otp', 400);
    }

    // Find the user
    const user = await this.authRepository.findUserById(userId);
    if(!user) {
      throw new NotFoundError('User not found');
    }

    // Mark the user as verified
    user.verified = true;

    // Save the user
    await user.save();

    // Generate JWT tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id)

    return { user, accessToken, refreshToken };
  }

  async signInUser(data: Omit<CreationAttributes<User>, "name"> ) {

    // Find the user
    const user = await this.authRepository.findByEmail(data.email);

    // Check if user exists and verified or not
    if(!user) {
      console.log("user not found")
      throw new NotFoundError('User not found');
    }

    if(!user.verified) {
      throw new ValidationError('User not verified');
    }

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(data.hashedPassword, user.hashedPassword);

    if(!isPasswordValid) {
      throw new ValidationError('Invalid password');
    }

    // Generate JWT tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return { user, accessToken, refreshToken };
  }
}