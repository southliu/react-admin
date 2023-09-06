/**
 * 获取翻译文件
 * @param lang - 翻译文件名
 */
export const getFiles = () => {
  const langFiles = import.meta.glob('../zh/*ts');
  console.log('langFiles:', langFiles)
  const result = handleFileList(langFiles);
  console.log('result:', result)
  return result;
};

/**
 * 处理文件转为对应格式
 * @param files - 文件集
 */
type FileParams = Record<string, () => void>;
export const handleFileList = (files: FileParams) => {
  const result: Record<string, unknown> = {};

  for (const key in files) {
    const fileArr = key?.split('/');
    const fileName = fileArr?.[fileArr?.length - 1] || '';
    if (!fileName) continue;
    const name = fileName?.split('.ts')?.[0];
    if (name) result[name] = files[key];
  }

  return result;
};

