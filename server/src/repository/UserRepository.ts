import { CreationAttributes } from "sequelize";
import { User } from "../models";

interface IAuthRepository {
  findById(id: string): Promise<User | null>;
  udpateUserById(id: string, data: CreationAttributes<User>): Promise<void | null>;
}

export class UserRepository implements IAuthRepository {
  async findById(id: string): Promise<User | null> {
    return await User.findByPk(id);
  }

  async udpateUserById(id: string, data: CreationAttributes<User>): Promise<void| null> {
    const [affectedCount] = await User.update({
      name: data.name,
      email: data.email,
      updatedAt: new Date()
    },{
      where: {
        id: id
      },
    });

    if(affectedCount === 0) return null;
  }
}