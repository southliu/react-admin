type IEnvConfigs = Record<string, string>

// env数据
interface IViteEnv {
  VITE_SERVER_PORT: number;
  VITE_PROXY: [string, string][];
}

/**
 * 处理转化env
 * @param envConfigs 
 */
export function handleEnv(envConfigs: IEnvConfigs): IViteEnv {
  const {
    VITE_SERVER_PORT,
    VITE_PROXY
  } = envConfigs

  const proxy: [string, string][] = VITE_PROXY ? JSON.parse(VITE_PROXY.replace(/'/g, '"')) : []

  const res: IViteEnv = {
    VITE_SERVER_PORT: Number(VITE_SERVER_PORT) || 8080,
    VITE_PROXY: proxy
  }

  return res
}