import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";

export class ProfileController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.getProfileController = this.getProfileController.bind(this);
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
}