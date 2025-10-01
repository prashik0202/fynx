import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreationAttributes } from "sequelize";
import { User } from "../models";

export class ProfileController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.getProfileController = this.getProfileController.bind(this);
    this.upadteProfileController = this.upadteProfileController.bind(this);
  }                                   

  async getProfileController(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const userData = await this.userService.getUserProfileData(userId);
      return res.status(200).json({ user: { id: userData.id, email: userData.email, name: userData.name } });
    } catch (error) {
      next(error);
    }
  }

  async upadteProfileController(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const updateUserData = req.body as CreationAttributes<User>;
      await this.userService.updateUserProfileData(userId,updateUserData);
      return res.status(200).json({ message : "User Data Updated Successfully"});
    } catch (error) {
      next(error);
    }
  }
}