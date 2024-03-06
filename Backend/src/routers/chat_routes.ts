import { Router } from "express";
import { chatComplitionValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token_manager.js";
import {
    deleteChats, 
    sendChatUser , generateChatCompletion} from "../controlers/Chat_Controls.js";


const chatRouter = Router();

chatRouter.post("/new",validate(chatComplitionValidator),verifyToken,generateChatCompletion);

chatRouter.get("/all-chats",verifyToken,sendChatUser);
chatRouter.delete("/delete",verifyToken,deleteChats);

export default chatRouter;