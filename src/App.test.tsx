
import { describe, test, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import { BrowserRouter } from 'react-router-dom'
import { waitFor } from '@storybook/testing-library'
import App from './App'
expect.extend(matchers)

describe('App', () => {
  test('App render và chuyển trang ', async () => {
   render(<App />, {wrapper: BrowserRouter})
  })
  const user = userEvent.setup()

    // verify vào đúng trang chủ
    // waitFor sẽ run callback 1 vài lần
    // cho đến khi hết timeout hoặc expect pass
    // số lần run phụ thuộc vào timeout và interval
    // mặc định timeout=1000ms , interval=50ms
    // await waitFor(()=>{
    //     expect(document.querySelector('title')?.textContent).toBe('Shoppe Clone')


  //   // verify chuyển sang trang login
  //   // nó sẽ in ra những gì giống console

     screen.debug(document.body.parentElement as HTMLElement, 99999999999)
  // })

  // verify page content for default route
  //   expect(screen.getByText(/you are home/i)).toBeInTheDocument()

  //   // verify page content for expected route after navigating
  //   await user.click(screen.getByText(/about/i))
  //   expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
  // })
})
