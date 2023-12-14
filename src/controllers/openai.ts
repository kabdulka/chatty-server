import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "..";

const sendText = async (req, res) => {
    try {
        const { text, activeChatId } = req.body; 
        console.log("req.body: ", req.body);
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "you are a helpful assistant." },
                { role: "user", content: text }
            ]
        })
        console.log('response: ', response)
        // api call to handle submit function
        await axios.post(
            `https://api.chatengine.io/chats/${activeChatId}/messages/`,
            { text: response.choices[0].message.content },
            {
                headers: {
                    "Project-ID": process.env.PROJECT_ID,
                    "User-Name": process.env.BOT_USER_NAME,
                    "User-Secret": process.env.BOT_USER_SECRET,
                },
            }
        )
        return res.status(200).json({ text: response.choices[0].message.content });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error })
    }
}

dotenv.config();


export {
    sendText,
}

