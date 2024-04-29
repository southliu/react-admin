type FileModule = Record<string, string>;
type FileParams = Record<string, FileModule>;

/** 获取中文翻译文件 */
export const getZhLang = () => {
  const langFiles = import.meta.glob('../zh/*ts', { import: 'default', eager: true }) as FileParams;
  const result = handleFileList(langFiles);
  return result;
};

/** 获取英文翻译文件 */
export const getEnLang = () => {
  const langFiles = import.meta.glob('../en/*ts', { import: 'default', eager: true }) as FileParams;
  const result = handleFileList(langFiles);
  return result;
};

/**
 * 处理文件转为对应格式
 * @param files - 文件集
 */
export const handleFileList = (files: FileParams) => {
  const result: Record<string, unknown> = {};

  for (const key in files) {
    const data = files[key];
    const fileArr = key?.split('/');
    const fileName = fileArr?.[fileArr?.length - 1] || '';
    if (!fileName) continue;
    const name = fileName?.split('.ts')?.[0];
    if (name) result[name] = data;
  }

  return result;
};
