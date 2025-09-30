import sequelize from "../database/connection";
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import User from "./user.model";

export class VerificationToken extends Model< InferAttributes<VerificationToken>, InferCreationAttributes<VerificationToken> > {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<User['id']>;
  declare otpHash: string; // store a bcrypt/argon2 hash of the 6-digit OTP
  declare expiresAt: Date;
  declare consumed: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

VerificationToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: "id",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
      references: {
        model: "users", // must match your User.tableName
        key: "id",
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    otpHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: 'Hashed OTP; never store raw OTP',
      field: "otp_hash",
    },
    consumed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "consumed",
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "expires_at",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize,
    modelName: "Verification_tokens",
    tableName: "verification_tokens",
    timestamps: false, // because we are handling createdAt manually
    indexes: [{ fields: ["user_id"] }, { fields: ["expires_at"] }, { fields: ["consumed"] }],
  }
);

export default VerificationToken;