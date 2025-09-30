import VerificationCodeType from "../constants/verificationCodeTypes";

export interface VerificationAttributes {
  id: number;
  userId: number;
  type: VerificationCodeType;
  createdAt: Date;
  expiresAt: Date;
}

export interface VerificationCreationAttributes extends Omit<VerificationAttributes, "id" | "createdAt" > {}
