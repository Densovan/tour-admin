import request from "@/common/request/request";
import { CategoryCreate, ICategory, RequestQuery } from "../types";

export const categoryApi = () => {
  const CREATE_CATEGORY = async (payload: CategoryCreate): Promise<string> => {
    return await request({
      url: "/category/private/create",
      method: "POST",
      data: payload,
    });
  };

  const CATEGORIES = async (query: RequestQuery): Promise<ICategory> => {
    return await request({
      url: "/category/public",
      method: "GET",
      params: query,
    });
  };

  return {
    CATEGORIES,
    CREATE_CATEGORY,
  };
};
