import { Router } from "express";
import userRouter from "./user_rout.js";
import chatRouter from "./chat_routes.js";
const appRouter = Router();
appRouter.use("/user", userRouter); //  domain/api/v1/user
appRouter.use("/chat", chatRouter); //  domain/api/v1/chats
export default appRouter;
//# sourceMappingURL=v1.js.map