import { NotFoundError } from "../errors/customError";
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
}