import axios, { AxiosError } from 'axios'
import { configs } from '../Contant.path/config'
import { ResponseApi } from 'src/types/utils.type'
// check lỗi
export function isAxiosErrors<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

// check lỗi 402
export function isAxiosAbleEntity<formError>(error: unknown): error is AxiosError<formError> {
  return isAxiosErrors(error) && error.response?.status === 422
}

// check lỗi 401
export function isAxiosError<formError>(error: unknown): error is AxiosError<formError> {
  return isAxiosErrors(error) && error.response?.status === 401
}

// check token hết hạn
// phải là lỗi 401 và tên là "'EXPIRED_TOKEN'"
export function isAxiosTokenError<formError>(error: unknown): error is AxiosError<formError> {
  return (
    isAxiosError<ResponseApi<{ name: string; message: string }>>(error) &&
    error?.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
}

export const rateSale = (original: number, sale: number) => {
  return Math.round(((original - sale) / original) * 100) + '%'
}

// bỏ hết kí tự đặc biệt
export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(' ', '-') + `-i,${id}`
}
///\s/g
export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i,')
  return arr[arr.length - 1]
}

export const getAvatar = (avatarName: string) =>
  avatarName
    ? `${configs.baseUrl}images/${avatarName}`
    : 'https://tse2.mm.bing.net/th?id=OIP.OAP22LZMJtSNFAw1QntX_AHaLH&pid=Api&P=0'


export  const demo=(value:number)=>{
  let result=0;
  if(value < 10){
    result ++ 
  }
  if(value % 2=== 0 ){
    result ++ 
  }
  return result 

}