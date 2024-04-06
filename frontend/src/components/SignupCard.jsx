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
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

//recoil
import { useSetRecoilState } from 'recoil'
import authScreenState from '../../atoms/authAtom'

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)

  const setAuthScreen = useSetRecoilState(authScreenState)

  // states
  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  })

  const toast = useToast();


  const handleSignup = async() =>{
    try {
        const res = await fetch("/api/users/signup", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input)
        })
        const data = await res.json()
        if(data.error){
            toast({
                title: 'Error', 
                description: data.error, 
                status: 'error', 
                duration: 3000, 
                isClosable: true
            })
            return
        }

        // if there is user then store it in th local storage.
        localStorage.setItem("user-threads", JSON.stringify(data))

        
    } catch (error) {
        console.log("Error while fetching signup route.",error)
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
            Sign up
          </Heading>
          

        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  {/* full name input */}
                  <Input value={input.name} type="text" onChange={(e)=> setInput({...input, name:e.target.value})}/>
                </FormControl>
              </Box>

            {/* User Name */}
              <Box>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input value={input.username} type="text" onChange={(e)=> setInput({...input, username:e.target.value})}/>
                </FormControl>
              </Box>
            </HStack>

            {/* Email */}
            <FormControl  isRequired>
              <FormLabel>Email address</FormLabel>
              <Input value={input.email} type="text" onChange={(e)=> setInput({...input, email:e.target.value})}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={input.password} onChange={(e)=>setInput({...input, password:e.target.value})}/>
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
                onClick={handleSignup}
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={'white'}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link onClick={()=>setAuthScreen("login")} color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}