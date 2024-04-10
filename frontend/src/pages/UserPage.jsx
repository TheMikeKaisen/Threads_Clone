import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'
import { Flex, Spinner } from '@chakra-ui/react'
import Post from '../components/Post'

const UserPage = () => {

  const [user, setUser] = useState(null)
  const {username} = useParams()

  const showToast = useShowToast()
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([])
  const [fetchingPost, setFetchingPost] = useState(false)

  useEffect(() => {
    const getUser = async() => {
      try {
        const res = await fetch(`/api/users/profile/${username}`)
        const data = await res.json()
        if(data.error){
          showToast('Error', data.error, 'error')
        }
        setUser(data);
      } catch (error) {
        showToast('Error', error.message, 'error')
      } finally{
        setLoading(false)
      }
    }

    const getPosts = async() => {
      setFetchingPost(true)
      try {
        const res = await fetch(`/api/posts/user/${username}`)
        const data = await res.json()
        if(data.error){
          showToast('Error', data.error, 'error')
          return
        }
        console.log(data)
        setPosts(data)

      } catch (error) {
        showToast('Error', error.message, 'error')
        setPosts([])
      } finally{
        setFetchingPost(false)
      }
    }
      
    getUser();
    getPosts();
  }, [username, showToast]);



  if(!user && loading){
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'}/>
      </Flex>
    )
  }

  if(!user && !loading) return <h1>User Not Found !!</h1>;

  return (
    <>
      <UserHeader user={user} />

      {!fetchingPost && posts.length === 0 && <h1>User has not Posted Yet.</h1>}
      {fetchingPost && (
        <Flex justifyContent={'center'} my={12}>
          <Spinner size={'xl'} />  
        </Flex>
      )}

      {posts.map((post)=>(
        <Post key={post._id} post={post} postedBy={post.postedBy}/>
      ))}
      
    </>
  )
}

export default UserPage
