import React from 'react'
import SignupCard from '../components/SignupCard'
import LoginCard from '../components/LoginCard'
import { useRecoilValue } from 'recoil'
import authScreenState from '../atoms/authAtom'

const AuthPage = () => {

    const authScreen = useRecoilValue(authScreenState);
    console.log(authScreen)
  return (
    <div>
        {authScreen=== "login"? <LoginCard /> :<SignupCard />}
    </div>
  )
}

export default AuthPage
