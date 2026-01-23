import { isPC, isSP } from 'src/assets-recipe-basic/js/utils'

/**
 * 3桁区切りでカンマ挿入
 */
export const formatNumToSeparatedString = (value: number | string) =>
  String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')

/**
 * 全角 → 半角変換
 */
export const toHalfString = (value: string) =>
  value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s: string) => String.fromCharCode(s.charCodeAt(0) - 65248))

/**
 * ゼロパディング
 */
export const zeroPadding = (num: number, len: number): string => {
  return (Array(len).join('0') + num).slice(-len)
}

/**
 * 改行コード付きのテキストをHTMLに変換する
 * @param { String } text テキスト
 * @returns { String }
 */
export const textToHTML = (text: string): string => {
  if (!text || text.trim.length < 0) {
    return ''
  }
  let result = text.replace(/\r\n|\n/g, '<br>')
  result = result.replace(/\\n/g, '<br>')
  result = result.replace(/""/g, '"')

  if (isPC()) {
    result = result.replace('|pc', '<br>')
    result = result.replace('|sp', '')
  } else if (isSP()) {
    result = result.replace('|pc', '')
    result = result.replace('|sp', '<br>')
  }

  return result
}

export const textToHTML2 = (text: string): string => {
  if (!text || text.trim.length < 0) {
    return ''
  }

  const result = text.replace(/\\n/g, '<br>')

  return result
}
