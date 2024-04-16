import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Actions from '../components/Actions'
import Comment from '../components/Comment'
import { useNavigate, useParams } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import { formatDistanceToNow } from 'date-fns'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { DeleteIcon } from '@chakra-ui/icons'
import postsAtom from '../atoms/postsAtom'

const PostPage = () => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useRecoilState(postsAtom)
    const showToast = useShowToast();
    const navigate = useNavigate()

    const currentUser = useRecoilValue(userAtom)

    const currentPost = posts[0];

    const {pid, username} = useParams();

    useEffect(() => {
        const getUser = async() => {
          try {
            const res = await fetch(`/api/users/profile/${username}`)
            const data = await res.json()
            if(data.error){
              showToast('Error', data.error, 'error')
            }
            // console.log("user", data)
            // console.log("currentUser", currentUser?._id)
            setUser(data);
          } catch (error) {
            showToast('Error', error.message, 'error')
          } finally{
            setLoading(false)
          }
        }

        const getPost = async() => {
            try {
                const res = await fetch(`/api/posts/${pid}`)
                const data = await res.json()
                if(data.error) {
                    showToast('Error', data.error, 'error')
                    return
                }
                setPosts([data]);
            } catch (error) {
                showToast('Error', error.message, 'error')
            }
        }


    
        
        getUser();
        getPost();
      }, [username, posts, pid, showToast]);

      const handleDeletePost = async(e) => {
        try {
          e.preventDefault()
          if(!window.confirm("Are you sure you want to delete this post?")) return;
  
          const res = await fetch(`/api/posts/${currentPost?._id}`, {
            method: 'DELETE'
          })
          const data = await res.json();
          if(data.error){
            showToast('Error', data.error, 'error')
            return
          }
          showToast('Success', 'Post Deleted successfully', 'success')
          navigate(`/${user.username}`)
  
        } catch (error) {
          showToast('Error', error.message, 'error')
        }
      }

      if(!user && loading) {
        return (
            <Flex justifyContent={'center'}>
                <Spinner size={'xl'} />
            </Flex>
        )
      }

      if(!currentPost) return <h1>No post to be shown here!!</h1>

  return (
    <>
    <Flex>
        <Flex w={'full'} alignItems={'center'} gap={3}>
            <Avatar src={user.profilePicture} size={'md'} name={currentPost.username} />
            <Flex>
                <Text fontSize={'sm'} fontWeight={'bold'}>
                    {user.username}
                </Text>
                <Image src='/verified.png' w={4} h={4} ml={4} />
            </Flex>
        </Flex>
        <Flex gap={4} alignItems={'center'} >
            <Text fontSize={'sm'} width={36} color={'gray.light'}>
                {formatDistanceToNow(new Date(currentPost?.createdAt))} ago
            </Text>

                {currentUser?._id === user?._id && <DeleteIcon size={20} cursor={'pointer'} onClick={handleDeletePost} />}

        </Flex>   
    </Flex>

    <Text my={3}>{currentPost.text}</Text>
    {currentPost.img && <Box borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'}>
                {/* image */}
                <Image 
                    src={currentPost.img} w={'full'}
                />
    </Box>}

    <Flex gap={3} my={3}>
        <Actions post={currentPost} />
    </Flex>

    
    <Divider my={4} />

    <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={'center'}>
            <Text fontSize={'2xl'}>
                :)
            </Text>
            <Text color={'gray.light'}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>
            Get
        </Button>
    </Flex>

    <Divider my={4}/>

    {currentPost.replies.map((reply)=>(

        <Comment 
        key={reply._id}
        reply={reply}  
        lastReply = {reply._id === currentPost.replies[currentPost.replies.length - 1]._id} 
        />
        
    ))}
   

    </>
  )
}

export default PostPage
