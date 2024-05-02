import request from '@/common/request/request';

export const dashboardApi = () => {
  const baseURL = '/dashboard';
  const GET_DASHBOARDS = async (): Promise<any> => {
    return await request({
      url: baseURL,
      method: 'GET',
    });
  };

  return {
    GET_DASHBOARDS,
  };
};
