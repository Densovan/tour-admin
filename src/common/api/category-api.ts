import request from "@/common/request/request";
import {
  CategoryCreate,
  CategoryUpdate,
  ICategory,
  IItemsCategory,
  RequestQuery,
} from "../types";

export const categoryApi = () => {
  const CREATE_CATEGORY = async (payload: CategoryCreate): Promise<string> => {
    return await request({
      url: "/category/private/create",
      method: "POST",
      data: payload,
    });
  };

  const UPDATE_CATEGORY = async (
    id: string,
    payload: CategoryUpdate
  ): Promise<string> => {
    console.log(id, "==id");
    return await request({
      url: `/category/private/update/${id}`,
      method: "PUT",
      data: {
        logo: payload.logo,
        name: payload.name,
      },
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
    UPDATE_CATEGORY,
    CATEGORIES,
    CREATE_CATEGORY,
  };
};
