import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'
import useShowToast from '../hooks/useShowToast'

const UserPage = () => {

  const [user, setUser] = useState(null)
  const {username} = useParams()

  const showToast = useShowToast()

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
        showToast('Error', error, 'error')
      }
    }
      
    getUser();
  }, [username, showToast]);

  if(!user) return null;

  return (
    <>
      <UserHeader user={user} />
      <UserPost likes={1200} replies={234} postImg={"/post1.png"} postTitle="Let's Talk About Threads."/>
      <UserPost likes={45} replies={5} postImg={"/post2.png"} postTitle="Fuhhck of mate"/>
      <UserPost likes={123} replies={56} postImg  ={"/post3.png"} postTitle="I love this guy"/>
      <UserPost likes={678} replies={7} postTitle="hello world!"/>
    </>
  )
}

export default UserPage
