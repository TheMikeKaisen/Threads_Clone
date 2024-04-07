'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'
import usePreviewImg from '../hooks/usePreviewImg'

export default function UserProfileEdit() {
    const [user, setUser] = useRecoilState(userAtom)
    const [input, setInput] = useState({
        name: user.name,
        username:user.username,
        email:user.email,
        bio:user.bio,
        password:""

    })

    // toast
    const showToast = useShowToast()


    const fileRef = useRef(null)

    const {handleImageChange, imgUrl} = usePreviewImg()

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        try {
            const res = await fetch(`/api/users/update/${user._id}`, {
                method: "PUT", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...input, profilePicture: imgUrl})
            })
            const data = await res.json()
            if(data.error){
                showToast('Error', data.error, 'error')
            }
            showToast("Success", "Profile updated successfully", 'success' )
            setUser(data);
            localStorage.setItem("user-threads", JSON.stringify(data))

        } catch (error) {
            showToast("Error", error.message, 'error')
        }
    }
  return (
    <form onSubmit={handleSubmit}>

    <Flex
      align={'center'}
      justify={'center'}
      my={6}
      >
      <Stack
        spacing={6}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.dark')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" boxShadow={'md'} src={imgUrl || user.profilePicture} />
                
            </Center>
            <Center w="full">
              <Button w="full" onClick={()=> fileRef.current.click()}>Change Icon</Button>
              <Input type='file' hidden ref={fileRef} onChange={handleImageChange}/>
            </Center>
          </Stack>
        </FormControl>
        <FormControl >
          <FormLabel>Full Name</FormLabel>
          <Input
            placeholder="John doe"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={input.name}
            onChange={(e)=> setInput({...input, name: e.target.value})}
          />
        </FormControl>
        <FormControl >
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="johndoe"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={input.username}
            onChange={(e)=> setInput({...input, username: e.target.value})}
          />
        </FormControl>
        <FormControl >
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={input.email}
            onChange={(e)=> setInput({...input, email: e.target.value})}
          />
        </FormControl>
        <FormControl >
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="your bio..."
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={input.bio}
            onChange={(e)=> setInput({...input, bio: e.target.value})}
          />
        </FormControl>
        <FormControl >
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
            value={input.password}
            onChange={(e)=> setInput({...input, password: e.target.value})}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            
            bg={'blue.400'}
            color={'white'}
            type='submit'
            w="full"
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
        
    </form>
  )
}