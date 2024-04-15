import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Actions from './Actions'
import { Link, useNavigate } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import {formatDistanceToNow} from 'date-fns'
import { useRecoilValue } from 'recoil'
import { DeleteIcon } from '@chakra-ui/icons'
import userAtom from '../atoms/userAtom'

const Post = ({post, postedBy}) => {

  const navigate = useNavigate()
    

    const [liked, setLiked] = useState(false)
    const [user, setUser] = useState(null)

    const currentUser = useRecoilValue(userAtom);

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

    const handleDeletePost = async(e) => {
      try {
        e.preventDefault()
        if(!window.confirm("Are you sure you want to delete this post?")) return;

        const res = await fetch(`/api/posts/${post?._id}`, {
          method: 'DELETE'
        })
        const data = await res.json();
        if(data.error){
          showToast('Error', data.error, 'error')
          return
        }
        showToast('Success', 'Post Deleted successfully', 'success')

      } catch (error) {
        showToast('Error', error.message, 'error')
      }
    }

  return (
    <Link to={`/${user?.username}/post/${post?._id}`}>

    
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
                name={post?.replies[0]?.name}
                src={post?.replies[0]?.userProfilePic}
                size={'xs'}
                position={'absolute'}
                top={'0px'}
                left={'15px'}
                padding={'2px'}
                />
              )}


              {post.replies[1] && (
                <Avatar 
                name={post?.replies[1]?.name}
                src={post?.replies[1]?.userProfilePic}
                size={'xs'}
                position={'absolute'}
                bottom={'0px'}
                right={'-5px'}
                padding={'2px'}
                />
                )}

                {post.replies[2] && (
                  <Avatar 
                  name={post?.replies[2]?.name}
                  src={post?.replies[2]?.userProfilePic}
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
                        {formatDistanceToNow(new Date(post?.createdAt))} ago
                    </Text>

                      {currentUser?._id === user?._id && <DeleteIcon size={20} onClick={handleDeletePost} />}

                </Flex>    
            </Flex>
            <Text fontSize={'small'}> 
               {post?.text}
            </Text>

            {/* post image */}
            <Box borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'}>
                {/* image */}
                { post?.img && <Image 
                    src={post?.img} w={'full'}
                />}
            </Box>
            <Flex gap={3} my={1}>
                <Actions post={post}/>
            </Flex>

            

        </Flex>
    </Flex>

    </Link>
  )
}

export default Post
