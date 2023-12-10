import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "..";

const sendText = async (req, res) => {
    try {
        const { text, activeChatId } = req.body; 
        console.log("Send Text");
        return res.status(200).json({ text });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error })
    }
}

dotenv.config();


export {
    sendText,
}

