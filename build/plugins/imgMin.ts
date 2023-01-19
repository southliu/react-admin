import type { PluginOption } from 'vite'
import { globby } from 'globby'
import fs from 'fs'
import path from 'path'
import imagemin from 'imagemin'
import imageminSvgo from 'imagemin-svgo'
import imageminOptpng from 'imagemin-optipng'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminGifsicle from 'imagemin-gifsicle'
import imageminPngquant from 'imagemin-pngquant'

/**
 * 获取文件绝对路径
 * @param filePath - 路径
 */
const getAbsPath = (filePath: string) => {
  const cwd = process.cwd()
  const absPath = path.resolve(cwd, filePath)
  return absPath
}

/**
 * 压缩单个文件
 * @param filePath - 路径
 */
const handleSingleFile = async (filePath: string) => {
  const fileBuffer = fs.readFileSync(filePath)
  const content = await imagemin.buffer(fileBuffer, {
    plugins: [
      imageminGifsicle(),
      imageminOptpng(),
      imageminSvgo(),
      imageminMozjpeg(),
      imageminPngquant()
    ]
  })

  return content
}

interface IFile {
  filePath: string;
  content: Buffer;
}

/**
 * 压缩文件
 * @param files - 路径
 */
const compressFiles = async (files: string[]) => {
  const result: IFile[] = []
  for (let i = 0; i < files.length; i++) {
    const filePath = files[i]
    const content = await handleSingleFile(filePath)
    result.push({ filePath, content })
  }
  return result
}

/**
 * 写入文件
 */
const writeFiles = async (data: IFile[]) => {
  if (data.length) {
    data.map(async (item) => {
      const { filePath, content } = item
      if (content) {
          fs.writeFileSync(filePath, content)
      }
    })
  }
}

/**
 * CDN对象映射
 */
export const imgMinPlugin = (): PluginOption => {
  return {
    name: 'img-min-plugin',
    buildStart: async () => {
      try {
        const dir = 'src/**/*.{jpg,png,jpeg,gif}'
        // 匹配输出文件目录
        const unixPaths = await globby(dir, { onlyFiles: true })
        // 获取绝对路径
        const absPaths = unixPaths.map(v => getAbsPath(v))
        // 压缩文件
        const compress = await compressFiles(absPaths)
        // 写入文件
        writeFiles(compress)
      } catch(err) {
        console.log('图片压缩失败:', err)
      }
    }
  }
}