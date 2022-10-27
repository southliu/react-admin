import { encrypt, decrypt } from 'crypto-js/aes'
import { CRYPTO_SECRET } from './config'
import UTF8 from 'crypto-js/enc-utf8'
import md5 from 'crypto-js/md5'

/**
 * @description: 加密/解密封装，secret值建议从后台接口获取
 */

/**
 * 加密
 * @param data - 加密数据
 * @param secret - 加密密钥
 */
export function encryption(data: object, secret: string = CRYPTO_SECRET) {
  const code = JSON.stringify(data)
  return encrypt(code, secret).toString()
}

/**
 * 解密
 * @param data - 解密数据
 * @param secret - 解密密钥
 */
export function decryption(data: string, secret: string = CRYPTO_SECRET) {
  const bytes = decrypt(data, secret)
  const originalText = bytes.toString(UTF8)
  if (originalText) {
    return JSON.parse(originalText)
  }
  return null
}

/**
 * md5加密
 * @param data - 加密数据
 */
export function encryptMd5(data: string) {
  return md5(data).toString()
}