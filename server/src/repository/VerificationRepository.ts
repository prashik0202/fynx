import { VerificationToken } from "../models";

interface IVerificationRepository {
  createVerificationToken(userId: string, token: string): Promise<void>;
  findTokenByUserId(userId: string): Promise<VerificationToken | null>;
}

export class VerificationRepository implements IVerificationRepository {
  async createVerificationToken(userId: string, token: string): Promise<void> {
    await VerificationToken.create({
      userId,
      otpHash: token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now
    });
  }

  async findTokenByUserId(userId: string): Promise<VerificationToken | null> {
    return await VerificationToken.findOne({ where: { userId }, order: [['createdAt', 'DESC']] });
  }
}