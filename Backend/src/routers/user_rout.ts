import { Router } from "express";
import { Forgot_Password, getAllusers, userLogout, userlogin, usersignup, verifyUser} from "../controlers/user_controls.js"
import  {signupvalidator,loginvalidator,validate}  from "../utils/validator.js";
import { verifyToken } from "../utils/token_manager.js";
const userRouter = Router();

userRouter.get("/", getAllusers );
userRouter.post("/signup",validate(signupvalidator),usersignup);
userRouter.post("/login",validate(loginvalidator),userlogin);
userRouter.get("/auth-status",verifyToken,verifyUser);
userRouter.get("/logout",verifyToken,userLogout);
userRouter.post("/forgot_password",Forgot_Password)

export default  userRouter;