import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "..";

const sendText = async (req, res) => {
      try {
    const { text, activeChatId } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." }, // this represents the bot and what role they will assume
        { role: "user", content: text }, // the message that the user sends

        // BONUS NOTE: you can also provide a list of messages to the bot to give context
        // and the bot can use that information to respond to the user as needed, ie adding:
        // { role: "assistant", content: "The weather sucks today." },

        // to the above messages array, and then asking it this question:
        // `how is the weather today?`

        // the bot gave me this response:
        // `I apologize for my previous response. As an AI language model, I should not use such language.
        // I do not have access to real-time weather information without your location. Could you please
        // let me know your location, so I can provide you with accurate weather information?`

        // Hence, if you wanted to keep the "threads" that exist on ChatGPT, you would have to save the
        // messages that the bot sends and then provide them to the bot in the next request.
      ],
    });
    console.log(" Here??? ");
    console.log(response.choices[0].message.content);
    console.log(text, activeChatId)
    console.log(process.env.PROJECT_ID, " ", process.env.BOT_USER_NAME, " ", process.env.BOT_USER_SECRET);
    
    const result = await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { 
        text: response.choices[0].message.content ,
      },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      }
    );
    console.log("What is result: " + result);

    res.status(200).json({ text: response.choices[0].message.content });
  } catch (error) {
    if (error.response) {
      console.error('Error status:', error.response.status); 
      console.error('Error details:', error.response.data.detail);
      console.log(error); 
    } else {
      console.error('Error:', error.message); // Network error or other error
    }
    res.status(500).json({ error: error.message });
  }
}

// dotenv.config();


export {
    sendText,
}

