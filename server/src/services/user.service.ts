import { CreationAttributes } from "sequelize";
import { AppError, NotFoundError } from "../errors/customError";
import { User } from "../models";
import { UserRepository } from "../repository/UserRepository";

export class UserService {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserProfileData(userId: string) : Promise<User> {
    const user = await this.userRepository.findById(userId);

    if(!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async updateUserProfileData(userId: string, data: CreationAttributes<User>): Promise<void> {
    // find User by id and if not exists then throw error
    const userExists = await this.userRepository.findById(userId);

    if(!userExists) {
      throw new NotFoundError("User not found");
    }

    // update the user
    const updatedUserSuccess = await this.userRepository.udpateUserById(userId,data);

    // if update repo returns null throw error
    if(!updatedUserSuccess) {
      throw new AppError("Unable to update User", 500);
    }
  }

}