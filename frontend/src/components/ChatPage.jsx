import { SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Conversations from './Conversations'
import {GiConversation} from 'react-icons/gi'
import MessageContainer from './MessageContainer'

const ChatPage = () => {
  return (
    <Box position={'absolute'}
         left={'50%'}
         transform={'translateX(-50%)'}
         w={{
            base: '100%',
            md: "80%",
            lg:'750px'
        }}
        >
    <Flex
        gap={4}
        flexDirection={{
            base: "column",
            md: "row",
        }}
        maxw={{
            sm: "400px",
            md: "full",
        }}
        mx={"auto"}
    >
            <Flex flex={30}
                gap={2}
                flexDirection={"column"}
                maxw={{
                    sm: "250px",
                    md: "full",
                }}
                mx="auto"
            >
            
            
        <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
        YourConversations
        </Text>
        <form>
            <Flex alignItems={"center"} gap={2}>
                <Input placeholder='Search for a user' />
                <Button size={'sm'}>
                    <SearchIcon />
                </Button>
            </Flex>
        </form>
        {false &&
            [0, 1, 2, 3, 4].map((_, i) => (
            <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
                <Box>
                    <SkeletonCircle size={"10"} />
                </Box>
                <Flex w={"full"} flexDirection={"column"} gap={3}>
                    <Skeleton h={"10px"} w={"80px"} />
                    <Skeleton h={"8px"} w={"98%"} />
                </Flex>
            </Flex>
            ))}
            <Conversations />
            <Conversations />
            <Conversations />
        </Flex>
        {/* <Flex
            flex={70}
            borderRadius={"md"}
            p={2}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"400px"}
            >
            <GiConversation size={100} />
            <Text fontSize={20}>Select a conversation to start messaging</Text>
       </Flex> */}
       <MessageContainer />
       </Flex>
    </Box>
  )
}

export default ChatPage
