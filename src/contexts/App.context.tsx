import { createContext, useState } from 'react'
import { getAccessTokenLS, getProfile } from 'src/Components/utils/auth'
import { User } from 'src/types/user.type'

interface AppContextInterface {
  isAuthenticationed: boolean
  profile: User | undefined
  reset:()=>void
  setProfile: React.Dispatch<React.SetStateAction<User | undefined>>
  setIsAuthenticationed: React.Dispatch<React.SetStateAction<boolean>>
}
const initial: AppContextInterface = {
  isAuthenticationed: Boolean(getAccessTokenLS()),

  setIsAuthenticationed: () => null,
  profile: getProfile(),
  setProfile: () => undefined,
  reset:()=>null
}
export const AppContext = createContext<AppContextInterface>(initial)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticationed, setIsAuthenticationed] = useState<boolean>(initial.isAuthenticationed)
  const [profile, setProfile] = useState<User | undefined>(initial.profile)
  const reset=()=>{
    setIsAuthenticationed(false)
    setProfile(undefined)
  }
  return (
    <AppContext.Provider value={{ isAuthenticationed, setIsAuthenticationed, profile, setProfile , reset}}>
      {children}
    </AppContext.Provider>
  )
}
