import { apiService } from "@/config/axiosConfig";
import type { User } from "@/types";

export const ProfileService = {
  getUserData: async () => {
    return apiService.get<{ user : User}>('/user/profile');
  },

  updateUserData: async(data: Omit<User, "id">) => {
    return apiService.put("/user/update/profile",data);
  }
};