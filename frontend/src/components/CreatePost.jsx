import { AddIcon } from '@chakra-ui/icons'
import { Button, CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { BsFillImageFill } from 'react-icons/bs'
import usePreviewImg from '../hooks/usePreviewImg'
import useShowToast from '../hooks/useShowToast'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import postsAtom from '../atoms/postsAtom'
import { useParams } from 'react-router-dom'

const MAX_CHAR = 500;

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const [postText, setPostText] = useState("")
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
    const [loading, setLoading] = useState(false)

    //recoil state
    const [posts, setPosts] = useRecoilState(postsAtom)
    
    const handleTextChange = (e)=>{
        const inputText = e.target.value; 

        if(inputText.length > MAX_CHAR){
            const truncatedText = inputText.slice(0, MAX_CHAR)
            setPostText(truncatedText);
            setRemainingChar(0);
        }else{
            setPostText(inputText);
            setRemainingChar(MAX_CHAR - inputText.length)
        }
    }
    
    const imageRef = useRef(null);
    
    const {handleImageChange, imgUrl, setImgUrl} = usePreviewImg()

    const showToast = useShowToast()

    const user = useRecoilValue(userAtom)
    const {username} = useParams()

    const handleCreatePost = async() => {
        setLoading(true);
        try {
            const res = await fetch('/api/posts/create', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({postedBy: user._id, text: postText, img: imgUrl})

            })
            const data = await res.json()
            if(data.error){
                showToast('Error', data.error, 'error')
                return
            }
            console.log(data)
            showToast('Success', "Post uploaded Successfully", 'success')
            if(username === user.username) {
              setPosts([data, ...posts])
            }

            onClose();
        } catch (error) {
            showToast('Error', error.message, 'error')
        } finally{
            setLoading(false);
            setImgUrl("")
            setPostText("")
        }
    }
    return (
      <>
        <Button
            right={10}
            bottom={10}
            position={'fixed'}
            leftIcon={<AddIcon />}
            bg={useColorModeValue("gray.300", "gray.dark")} 
            onClick={onOpen}
        >
        Post
        </Button>
        
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>

                {/* Text Area */}
                <Textarea 
                placeholder="What's on your mind ?"
                onChange={handleTextChange}
                value={postText}
                />

                {/* text length control */}
                <Text 
                fontSize={'xs'} 
                color={'gray.500'} 
                fontWeight={'bold'} 
                textAlign={'right'} 
                m={'1'}>
                    {remainingChar}/{MAX_CHAR}
                </Text>

                {/* image upload */}
                <Input
                type='file'
                hidden
                ref={imageRef}
                onChange={handleImageChange}

                />
                <BsFillImageFill 
                style={{marginLeft:"5px", cursor:"pointer"}}
                size={16}
                onClick={()=>imageRef.current.click()}
                />
              </FormControl>

              {imgUrl && (
                <Flex mt={5} position={'relative'} w={'full'}>

                  <Image 
                  src={imgUrl}
                  alt='post image'
                  />
                  <CloseButton 
                    onClick={()=>setImgUrl("")}
                    bg={'gray.800'}
                    position={'absolute'}
                    right={2}
                    top={2}
                  />
                  
                  </Flex>
              )
              }
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
                Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
    
  
}

export default CreatePost
