import { Avatar, Box, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import {BsInstagram} from 'react-icons/bs'
import {CgMoreO} from 'react-icons/cg'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { Link as RouterLink } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'

const UserHeader = ({user}) => {
    const toast = useToast();
    const showToast = useShowToast()

    const currentUser = useRecoilValue(userAtom) || {}

    const [following, setFollowing] = useState(user?.followers.includes(currentUser._id || false))
    const [updating, setUpdating] = useState(false)

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


    const handleFollowUnfollow = async() => {
        if(!currentUser){
            showToast("Error", "Login to follow the account", 'error')
            return;
        }
        setUpdating(true);
        try {
           const res = await fetch(`/api/users/follow/${user._id}`, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            
           })
           const data = await res.json()

           if(following){
            showToast("Success",`unfollowed ${user.username}`, 'success')
            user.followers.pop() // for the followers count on header to decrease
           }
           if(!following){
            showToast("Success",`Followed ${user.username}`, 'success')
            user.followers.push(currentUser._id) // for the followers count on the header to decrese
           }

           if(data.error) {
            showToast("Error", data.error, 'error')
            return
           } 
           setFollowing(!following)
           console.log(data)
        } catch (error) {
            showToast("Error", error, 'error')
        } finally{
            setUpdating(false)
        }
    }
  return (
    <VStack gap={'4'} alignItems={'start'}>
        <Flex justifyContent="space-between" w={'full'}>
            <Box>
                <Text fontSize={"4xl"} fontWeight={'bold'}>{user.name}</Text>
                <Flex gap={'2'} alignItems={'center'}>
                    <Text fontSize={'sm'}>
                    {user.username}
                    </Text>
                    <Text fontSize={'xs'} bg={'gray.dark'} textColor={'gray.light'} rounded={'full'} p={'1'}>
                        threads.net
                    </Text>
                </Flex>
            </Box>
            <Box>
                {user.profilePicture ? <Avatar 
                    name = {user.name}
                    src = {user.profilePicture}
                    size={
                        {
                            base: 'md',
                            md: 'xl',
                        }
                    }
                /> :
                <Avatar 
                    name = {user.name}
                    src = 'https://imgs.search.brave.com/PTKYGKHHaIjU3HPD6XlByFFysuhRTAtRiIAQ0NeYPLo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzkxL2Vj/L2M3LzkxZWNjNzdi/ZmE4OWU4NzdlNDcw/Y2E3ZDk5ZWQyZTlh/LmpwZw'
                    size={
                        {
                            base: 'md',
                            md: 'xl',
                        }
                    }
                />}
            </Box>
        </Flex>
        <Text>{user.bio}</Text>

        {currentUser._id === user._id ?
        <Link as={RouterLink} to='/update'>
            <Button size={'sm'}> 
                Update Profile
            </Button>
        </Link>
        :
        <Link as={RouterLink}>
            <Button size={'sm'} onClick={handleFollowUnfollow} isLoading={updating}>
                {following ? "Unfollow" : "Follow"}
            </Button>
        </Link>    
        }

        <Flex justifyContent={'space-between'} w={'full'}>
            <Flex gap={'2'} alignItems={'center'}>
                <Text fontSize={'sm'} textColor={'gray.light'}>{user.followers.length} followers</Text>
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

        <Flex w={'full'}>
            <Flex flex={1} borderBottom={'1.5px solid white'} justifyContent={'center'} pb={'3'} 
                cursor={'pointer'}>
                <Text fontWeight={'bold'}>Threads</Text>
            </Flex>
            <Flex flex={1} borderBottom={'1.5px solid gray'} justifyContent={'center'} pb={'3'} 
                cursor={'pointer'} color={'gray.light'}>
                    <Text fontWeight={'bold'}>
                        Replies
                    </Text>
                </Flex>

        </Flex>
    </VStack>
  )
}

export default UserHeader
