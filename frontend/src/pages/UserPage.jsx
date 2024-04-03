import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost likes={1200} replies={234} postImg={"/post1.png"} postTitle="Let's Talk About Threads."/>
      <UserPost likes={45} replies={5} postImg={"/post2.png"} postTitle="Fuhhck of mate"/>
      <UserPost likes={123} replies={56} postImg  ={"/post3.png"} postTitle="I love this guy"/>
      <UserPost likes={678} replies={7} postTitle="hello world!"/>
    </>
  )
}

export default UserPage
