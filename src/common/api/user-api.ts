import type { AuthLoginForm, IAuthResponse } from "@/common/types/auth.type";
import request from "@/common/request/request";

export const useUserRequest = () => {
  const POST_LOGIN = async (payload: AuthLoginForm): Promise<IAuthResponse> => {
    return await request({
      url: "/auth/signin",
      method: "POST",
      data: payload,
    });
  };
  return {
    POST_LOGIN,
  };
};
