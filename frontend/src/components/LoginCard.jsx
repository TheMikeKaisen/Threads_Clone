'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

//recoil
import { useSetRecoilState } from 'recoil'
import authScreenState from '../atoms/authAtom'
import useShowToast from '../hooks/useShowToast'
import userAtom from '../atoms/userAtom'

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false)

  const showToast = useShowToast();

  const [input, setInput] = useState({
    username: "", 
    password: ""
  })

  // atoms
  const setAuthScreen = useSetRecoilState(authScreenState)
  const setUser = useSetRecoilState(userAtom)

  const handleClick=async() => {
    try {
        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                'Content-Type':"application/json"
            },
            body: JSON.stringify(input)
        })
        const data = await res.json();
        if(data.error){
            showToast(data.error)
            return
        }
        localStorage.setItem('user-threads', JSON.stringify(data))
        setUser(data);

        console.log(data);



    } catch (error) {
        showToast("Error", error, 'error')
    }
  }

  return (
    <Flex
      
      align={'center'}
      justify={'center'}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
          

        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}
          w={{
            base: "full",
            sm:"400px",

          }}
          >
          <Stack spacing={4}>
            
              

            {/* User Name */}
              <Box>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" value={input.username} onChange={(e)=> setInput({...input, username: e.target.value})}/>
                </FormControl>
              </Box>
            

            
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} 
                    value={input.password}
                    onChange={(e)=> setInput({...input, password: e.target.value})}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleClick}
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={'white'}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}>
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don't have an account? <Link onClick={()=> setAuthScreen("signup")} color={'blue.400'}>Sign Up</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}