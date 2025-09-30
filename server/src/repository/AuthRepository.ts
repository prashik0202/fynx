import { CreationAttributes } from "sequelize";
import { User } from "../models";

interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
  createUser(userData: CreationAttributes<User>): Promise<User>;
}

export class AuthRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async findUserById(id: string): Promise<User | null> {
    return await User.findByPk(id);
  }

  async createUser(userData: CreationAttributes<User>): Promise<User> {
    return await User.create(userData);
  }
}