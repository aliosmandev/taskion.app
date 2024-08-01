import { ApiResponse } from "../types/api/instance";
import { UserResult } from "../types/api/user";
import instance from "./instance";

export const getAuthMe = async () => {
  const response = await instance.get<ApiResponse<UserResult[]>>("/auth/me");
  return response.data;
};
