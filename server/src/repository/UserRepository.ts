import { User } from "../models";

interface IAuthRepository {
  findById(id: string): Promise<User | null>;
}

export class UserRepository implements IAuthRepository {
  async findById(id: string): Promise<User | null> {
    return await User.findByPk(id);
  }
}