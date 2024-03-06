// import { Request,Response,NextFunction } from "express";
// import User from "../models/user.js";
// import OpenAI from 'openai';
import User from "../models/user.js";
import OpenAI from 'openai';
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User Not Registered" });
        }
        // Gather the existing chats
        const chats = user.Chats.map(({ role, content }) => ({
            role,
            content
        }));
        // Add the new user message
        chats.push({ role: "user", content: message });
        // Send all chats, including the new one, to the OpenAI API
        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_KEY,
            organization: process.env.OPEN_AI_ORGANIZATION,
        });
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Use GPT-3.5-turbo model
            messages: chats
        });
        // Save the assistant's response
        user.Chats.push(chatResponse.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.Chats });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};
export const sendChatUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User Not Registerd");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission Did'nt match");
        }
        return res.status(200).json({ message: "ok", chats: user.Chats });
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Internal Server error" });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //check user token
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registerd");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("PerMission Didn't Match");
        }
        //@ts-ignore
        user.Chats = [];
        await user.save();
        return res.status(200).json({ message: "ok" });
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({ message: "Internal Server Error" });
    }
};
//# sourceMappingURL=Chat_Controls.js.map