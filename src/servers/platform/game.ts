import { request } from '@/servers/request';

enum API {
  COMMON_URL = '/authority/common',
}

interface Result {
  id: string;
  name: string;
  children?: Result[];
}

/**
 * 获取游戏数据
 * @param data - 请求数据
 */
export function getGames(data?: unknown) {
  return request.get<Result[]>(
    `${API.COMMON_URL}/games`,
    { params: data }
  );
}
