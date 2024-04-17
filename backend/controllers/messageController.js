import Conversation from "../models/conversationModel.js"
import Message from "../models/messageModel.js"



const sendMessage = async(req, res) => {
    try {
        const {recipientId, message} = req.body
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recipientId]}
        })

        if(!conversation){
            conversation = new Conversation({
                participants: [senderId, recipientId],
                lastMessage: {
                    text: message, 
                    sender: senderId,
                }
            })
            await conversation.save();
        }

        const newMessage = new Message({
            conversationId : conversation._id, 
            sender: senderId, 
            text: message, 
        })

        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage: {
                    text: message, 
                    sender: senderId,
                }
            })
        ])

        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getMessages = async(req, res) => {
    try {
        const {otherUserId} = req.params
        const userId = req.user._id

        console.log("userId :", userId)
        console.log("otherUserId :", otherUserId)

        const conversations = await Conversation.findOne({
            participants: {$all: [userId, otherUserId]}
        })

        if(!conversations) {
            return res.status(404).json({error: "Conversation not found!"})
        }

        const messages = await Message.find({
            conversationId: conversations._id,
        }).sort({createdAt: -1})
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getConversations = async(req, res) => {
    try {
        const userId = req.user._id
        const conversations = await Conversation.find({participants: userId}).populate({
            path: "participants",
            select: 'username profilePicture'
        })
        if(!conversations){
            res.status(404).json({error: "Could not find the conversation you are looking for!"})
            return;
        }
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export {
    sendMessage,
    getMessages,
    getConversations
}