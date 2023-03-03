import { useSearchParams } from 'react-router-dom'
export const useQueryParam = () => {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}

