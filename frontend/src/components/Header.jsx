import { Flex, Image, useColorMode } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
    const {colorMode, toggleColorMode} = useColorMode() // used to retrieve the current color mode (dark or light)
  return (
    <Flex justifyContent={"center"} mt={6} mb="12">
    <Image 
        cursor={"pointer"}
        alt='logo'
        src={colorMode === "light" ? "/dark-logo.svg" : "/light-logo.svg"}
        w={6}
        onClick={toggleColorMode}
    />
    </Flex>
  )
}

export default Header
