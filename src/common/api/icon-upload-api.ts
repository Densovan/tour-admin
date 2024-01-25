import request from "@/common/request/request";

export const iconUploadApi = () => {
  const ICON_UPLOAD = async (payload: any) => {
    return await request({
      url: "/upload",
      method: "POST",
      data: payload,
    });
  };
  return {
    ICON_UPLOAD,
  };
};
