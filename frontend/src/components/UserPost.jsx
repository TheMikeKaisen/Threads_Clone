import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'
import { Link } from 'react-router-dom'

const UserPost = ({likes, replies, postImg, postTitle}) => {

    

    const [liked, setLiked] = useState(false)
  return (
    <Link to='/mark/post/1'>

    
    <Flex padding={'25px'}>
        <Flex flexDirection={'column'} alignItems={'center'}>
            {/* left */}
            <Avatar
                size={'md'}
                name='Mark Zuckerberg' 
                src='./zuck-avatar.png'
            />
            <Box w={'1px'} h={'full'} bg={'gray.light'} my={2}></Box>
            <Box position={'relative'} w={'full'}>
                <Avatar 
                    name='avatar1'
                    src='https://bit.ly/sage-adebayo'
                    size={'xs'}
                    position={'absolute'}
                    top={'0px'}
                    left={'15px'}
                    padding={'2px'}
                />
                <Avatar 
                    name='avatar1'
                    src='https://bit.ly/dan-abramov'
                    size={'xs'}
                    position={'absolute'}
                    bottom={'0px'}
                    right={'-5px'}
                    padding={'2px'}
                />
                <Avatar 
                    name='avatar1'
                    src='https://bit.ly/ryan-florence'
                    size={'xs'}
                    position={'absolute'}
                    bottom={'0px'}
                    left={'4px'}
                    padding={'2px'}
                />
            </Box>
        </Flex>
        <Flex flex={1} flexDirection={'column'} ml={'8px'} gap={2}>
            {/* Right part */}
            <Flex justifyContent={"space-between"} w={'full'}>
                <Flex>
                    {/* heading */}
                    <Text fontWeight={'bold'} fontSize={'sm'}>markzuckerberg</Text>
                    <Image 
                        src='./verified.png'
                        w={4} h={4}
                        ml={1}
                    />
                </Flex>
                <Flex gap={4} alignItems={'center'} >
                    <Text fontStyle={'sm'} color={'gray.light'}>
                        1d
                    </Text>
                    <BsThreeDots />
                </Flex>    
            </Flex>
            <Text fontSize={'small'}> 
               {postTitle}
            </Text>
            <Box borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'}>
                {/* image */}
                { postImg && <Image 
                    src={postImg} w={'full'}
                />}
            </Box>
            <Flex gap={3} my={1}>
                <Actions liked={liked} setLiked={setLiked}/>
            </Flex>

            <Flex gap={2} alignItems={'center'}>
                <Text color={'gray.light'} fontSize={'small'}>
                    {replies} replies
                </Text>
                <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}> </Box>
                    <Text color={'gray.light'} fontSize={'small'}>
                         {likes} likes
                    </Text>
                
            </Flex>

        </Flex>
    </Flex>

    </Link>
  )
}

export default UserPost
