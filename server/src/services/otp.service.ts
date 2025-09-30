import bcrypt from 'bcrypt';
import { NotFoundError, ValidationError } from '../errors/customError';
import { VerificationRepository } from '../repository/VerificationRepository';

export class OtpService {

  private verificationRepository: VerificationRepository;

  constructor() {
    this.verificationRepository = new VerificationRepository();
  }

  /**
   * Creates a one-time password (OTP) for a user.
   * @param userId The ID of the user.
   * @returns The generated OTP.
   */
  async createOtpForUser(userId: string) : Promise<string> {
    const otp = String(Math.floor(100000 + Math.random() * 900000)); // 6 digit OTP
    const otpHash = bcrypt.hashSync(otp, 10);

    await this.verificationRepository.createVerificationToken(userId, otpHash);

    return otp;
  }

  /**
   * Verifies the OTP for a user.
   * @param userId The ID of the user.
   * @param otp The OTP to verify.
   * @returns True if the OTP is valid, false otherwise.
   */
  async verifyOtp(userId : string, otp: string) {

    // find the token based on userId
    const token = await this.verificationRepository.findTokenByUserId(userId);

    // if token not found and expired
    if(!token) {
      throw new NotFoundError('OTP not found');
    }
    if(token.expiresAt < new Date()) {
      throw new ValidationError('OTP expired');
    }

    // compare the provided OTP with the stored OTP hash
    const isValid = await bcrypt.compare(otp, token.otpHash);

    // if OTP is invalid, return false
    if(!isValid) {
      throw new ValidationError('Invalid OTP');
    }
    
    // mark the token as consumed
    token.consumed = true;

    // save the updated token
    await token.save();

    return true;
  }
}