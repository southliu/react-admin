type EnvConfigs = Record<string, string>

// env数据
interface ViteEnv {
  VITE_SERVER_PORT: number;
  VITE_PROXY: [string, string][];
}

/**
 * 处理转化env
 * @param envConfigs 
 */
export function handleEnv(envConfigs: EnvConfigs): ViteEnv {
  const {
    VITE_SERVER_PORT,
    VITE_PROXY
  } = envConfigs;

  const proxy: [string, string][] = VITE_PROXY ? JSON.parse(VITE_PROXY.replace(/'/g, '"')) : [];

  const res: ViteEnv = {
    VITE_SERVER_PORT: Number(VITE_SERVER_PORT) || 8080,
    VITE_PROXY: proxy
  };

  return res;
}

/**
 * JS模块分包
 * @param id - 标识符
 */
export function splitJSModules(id: string) {
  // pnpm兼容
  const pnpmName = id.includes('.pnpm') ? '.pnpm/' : '';
  const fileName = `node_modules/${pnpmName}`;

  const result = id
    .split(fileName)[1]
    .split('/')[0]
    .toString();

  return result;
}
