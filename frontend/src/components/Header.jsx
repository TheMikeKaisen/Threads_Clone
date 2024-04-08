import { Flex, Image, Link, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { Link as RouterLink} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {RxAvatar} from 'react-icons/rx'
const Header = () => {
    const {colorMode, toggleColorMode} = useColorMode() // used to retrieve the current color mode (dark or light)

    const user = useRecoilValue(userAtom)
  return (
    <Flex justifyContent={"space-between"} mt={6} mb="12">

      {user && (
        <Link as={RouterLink} to='/'>
        <AiFillHome size={24} />
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
          <Link as={RouterLink} to={`/${user.username}`}>
          <RxAvatar size={24} />
          </Link>
        )}
    </Flex>
  )
}

export default Header
