export interface UserAttributes {
  id: number;
  userName: string;
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes extends Omit<UserAttributes, "id" | "createdAt" | "updatedAt" | "verified"> {}

