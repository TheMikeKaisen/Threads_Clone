import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import {BsInstagram} from 'react-icons/bs'
import {CgMoreO} from 'react-icons/cg'

const UserHeader = () => {

    const toast = useToast()

    const copyURL = (e) => {
        e.preventDefault()
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                position: 'top',
                title: 'User profile copied',
                status: 'success',
                duration: 1500,
                isClosable: true,
              })
        })
    }
  return (
    <VStack gap={'4'} alignItems={'start'}>
        <Flex justifyContent="space-between" w={'full'}>
            <Box>
                <Text fontSize={"4xl"} fontWeight={'bold'}>Mark Zuckerberg</Text>
                <Flex gap={'2'} alignItems={'center'}>
                    <Text fontSize={'sm'}>
                        zuckerberg
                    </Text>
                    <Text fontSize={'xs'} bg={'gray.dark'} textColor={'gray.light'} rounded={'full'} p={'1'}>
                        threads.net
                    </Text>
                </Flex>
            </Box>
            <Box>
                <Avatar 
                    name = "Mark Zuckerberg"
                    src = '/zuck-avatar.png'
                    size={"xl"}
                />
            </Box>
        </Flex>
        <Text>Co-founder, executive chairman and CEO of MEeta Platforms.</Text>

        <Flex justifyContent={'space-between'} w={'full'}>
            <Flex gap={'2'} alignItems={'center'}>
                <Text fontSize={'sm'} textColor={'gray.light'}>3.2K followers</Text>
                <Box w={'1'} h={'1'} rounded={'full'} bgColor={'gray.light'}></Box>
                <Link color={'gray.light'}>instagram.com</Link>

            </Flex>

            <Flex>
                <Box className='icon-container'>
                    <BsInstagram size={24} cursor={'pointer'}/>
                </Box>
                <Box className='icon-container'>
                    <Menu>
                        <MenuButton>
                            <CgMoreO size={24} cursor={'pointer'}/>
                        </MenuButton>
                        <Portal>
                            <MenuList bg={'gray.dark'}>
                                <MenuItem bg={'gray.dark'} onClick={copyURL}>Copy link</MenuItem>
                            </MenuList>
                        </Portal>

                    </Menu>
                </Box>
            </Flex>
        </Flex>
    </VStack>
  )
}

export default UserHeader
