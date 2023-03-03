// mô tả tập hợp các ngữ cảnh hoặc
//đơn vị cần test: ví dụ như function or component
import { AxiosError } from 'axios'
import { describe,test, it, expect } from 'vitest'
import { demo, isAxiosAbleEntity, isAxiosErrors } from '../utils'
describe('isAxiosErrors', () => {
  //it dùng để ghi chú trường hợp cần test

  it('isAxiosErrors trả về boolean', () => {
    //expect trả về giá trị mong đợi
    expect(isAxiosErrors(new Error())).toBe(false)
    expect(isAxiosErrors(new AxiosError())).toBe(true)
  })
})



describe('isAxiosAbleEntity', () => {
  //it dùng để ghi chú trường hợp cần test

  it('isAxiosAbleEntity trả về boolean', () => {
    //expect trả về giá trị mong đợi
    expect(isAxiosAbleEntity(new Error())).toBe(false)
    expect(
      isAxiosAbleEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: 500,
          data: null
        } as any)
      )
    ).toBe(false)
    expect(
        isAxiosAbleEntity(
          new AxiosError(undefined, undefined, undefined, undefined, {
            status: 422,
            data: null
          } as any)
        )
      ).toBe(true)
  })
})


describe('demo',()=>{
  test('demo return 2',()=>{
    expect(demo(4)).toBe(2)
  })
})
