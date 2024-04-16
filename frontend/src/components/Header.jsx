import { Button, Flex, Image, Link, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import { Link as RouterLink} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {RxAvatar} from 'react-icons/rx'
import { FiLogOut } from 'react-icons/fi'
import useLogout from '../hooks/useLogout'
import authScreenState from '../atoms/authAtom'
import { BsFillChatQuoteFill } from 'react-icons/bs'
const Header = () => {
    const {colorMode, toggleColorMode} = useColorMode() // used to retrieve the current color mode (dark or light)

    const user = useRecoilValue(userAtom)

    const setAuthScreen = useSetRecoilState(authScreenState)

    const {logout} = useLogout();
  return (
    <Flex justifyContent={"space-between"} mt={6} mb="12">

      {user && (
        <Link as={RouterLink} to='/'>
        <AiFillHome size={24} />
        </Link>
      )}
      {!user && (
        <Link as={RouterLink} to={'/auth'} onClick={() => setAuthScreen('login')}>
        Login
        </Link>
      )}

    <Image 
        cursor={"pointer"}
        alt='logo'
        src={colorMode === "light" ? "/dark-logo.svg" : "/light-logo.svg"}
        w={6}
        onClick={toggleColorMode}
        />
        {user && (

          <Flex alignItems={'center'} gap={4}>

            <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
            </Link>
            <Link as={RouterLink} to={`/chat`}>
            <BsFillChatQuoteFill size={20} />
            </Link>

            <Button size={'xs'} onClick={logout}>
                <FiLogOut size={20}/>
            </Button>
          </Flex>
        
        )}
        {!user && (
          <Link as={RouterLink} to={'/auth'} onClick={()=> setAuthScreen('signup')}>
          SignUp
          </Link>
        )}
    </Flex>
  )
}

export default Header
