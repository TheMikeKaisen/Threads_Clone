import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Actions from './Actions'
import { Link, useNavigate } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import {formatDistanceToNow} from 'date-fns'

const Post = ({post, postedBy}) => {

  const navigate = useNavigate()
    

    const [liked, setLiked] = useState(false)
    const [user, setUser] = useState(null)

    const showToast = useShowToast()
    
    useEffect(() => {
      const getUser = async() => {
        try {
          const res = await fetch('/api/users/profile/'+ postedBy);
          const data = await res.json()
          if(data.error) {
            showToast('Error', data.error, 'error')
            return;
          }
          setUser(data)
        } catch (error) {
          showToast("Error", error.message, 'error')
          setUser(null);
        }

      }

      getUser();
      
    }, [postedBy, showToast])

    console.log(user)
  return (
    <Link to={`/${user?.username}/post/${post._id}`}>

    
    <Flex padding={'25px'}>
        <Flex flexDirection={'column'} alignItems={'center'}>
            {/* left */}
            <Avatar
                size={'md'}
                name={user?.name} 
                src= {user?.profilePicture}
                onClick={(e)=>{
                  e.preventDefault()
                  navigate(`/${user?.username}`)
                }}
            />
            <Box w={'1px'} h={'full'} bg={'gray.light'} my={2}></Box>
            <Box position={'relative'} w={'full'}>

              {post.replies.length === 0 && <Text textAlign={'center'}>😭</Text>}

              {post?.replies[0] && (
                <Avatar 
                name={post.replies[0]?.name}
                src={post.replies[0]?.userProfilePic}
                size={'xs'}
                position={'absolute'}
                top={'0px'}
                left={'15px'}
                padding={'2px'}
                />
              )}


              {post.replies[1] && (
                <Avatar 
                name={post.replies[1]?.name}
                src={post.replies[1]?.userProfilePic}
                size={'xs'}
                position={'absolute'}
                bottom={'0px'}
                right={'-5px'}
                padding={'2px'}
                />
                )}

                {post.replies[2] && (
                  <Avatar 
                  name={post.replies[2]?.name}
                  src={post.replies[2]?.userProfilePic}
                  size={'xs'}
                  position={'absolute'}
                  bottom={'0px'}
                  left={'4px'}
                  padding={'2px'}
                  />
                  )}
            </Box>
        </Flex>
        <Flex flex={1} flexDirection={'column'} ml={'8px'} gap={2}>
            {/* Right part */}
            <Flex justifyContent={"space-between"} w={'full'}>
                <Flex>
                    {/* heading */}
                    <Text fontWeight={'bold'} fontSize={'sm'}
                      onClick={(e)=>{
                        e.preventDefault()
                        navigate(`/${user?.username}`)
                      }}
                    >{user?.username}</Text>

                    <Image 
                        src='./verified.png'
                        w={4} h={4}
                        ml={1}
                    />
                </Flex>
                <Flex gap={4} alignItems={'center'} >
                    <Text fontSize={'sm'} width={36} color={'gray.light'}>
                        {formatDistanceToNow(new Date(post.createdAt))} ago
                    </Text>
                </Flex>    
            </Flex>
            <Text fontSize={'small'}> 
               {post.text}
            </Text>

            {/* post image */}
            <Box borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'}>
                {/* image */}
                { post.img && <Image 
                    src={post.img} w={'full'}
                />}
            </Box>
            <Flex gap={3} my={1}>
                <Actions liked={liked} setLiked={setLiked}/>
            </Flex>

            <Flex gap={2} alignItems={'center'}>
                <Text color={'gray.light'} fontSize={'small'}>
                    {post.replies.length} replies
                </Text>
                <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}> </Box>
                    <Text color={'gray.light'} fontSize={'small'}>
                         {post.likes.length} likes
                    </Text>
                
            </Flex>

        </Flex>
    </Flex>

    </Link>
  )
}

export default Post
