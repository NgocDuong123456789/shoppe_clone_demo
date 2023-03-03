export interface ResponseApi<Data> {
  message: string
  data?: Data
}
// cú pháp `-?` sẽ loại bỏ  undefed key optional 

export type NoUndefinedField<T>={
  [P in keyof T]-?:NoUndefinedField<NonNullable<T[P]>>
}
// giúp lại bỏ đc undefed trong key optional
