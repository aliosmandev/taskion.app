import { ApiResponse } from "../types/api/instance";
import { PagesResult } from "../types/api/pages";
import instance from "./instance";

export const getPages = async () => {
  const response = await instance.get<ApiResponse<PagesResult[]>>("/pages/all");
  return response.data;
};
