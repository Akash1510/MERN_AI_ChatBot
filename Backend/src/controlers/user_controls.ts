import { NextFunction ,Request,Response} from "express";
import User from "../models/user.js";
import {hash,genSalt,compare} from 'bcrypt';   //use for the password hashing 
import  {createToken } from "../utils/token_manager.js";
import {COOKIE_NAME} from "../utils/auth_token.js";





const getAllusers= async(req:Request,res:Response,next:NextFunction)=>{
    //get all the users
    try {
        const user = await User.find();
        return res.status(200).json({message:"OK",user});
        
    } catch (error) {
        console.log(error);
        
        return res.status(200).json({message:"ERROR"});
    }


}

// user sign up

const usersignup= async(req:Request,res:Response,next:NextFunction)=>{
    try{
   const {name,email,password} = req.body;

   const salt = await genSalt(10);

   const  exist_User = await User.findOne({email});

   if(exist_User){
    return res.status(401).send("User is already Registerd");
   }

   const hashPassword =await  hash(password,salt);
   
       const users = new User({name,email,password:hashPassword });
       await users.save();

       //create the cookie and store it 
         res.clearCookie(COOKIE_NAME,{
            httpOnly:true,
            domain:"localhost",
            signed:true,
            path:"/"

        });
        // get token here

         const token  = createToken(users._id.toString(),users.email); //"10"

        //  const expires = new Date();
        //  expires.setDate(expires.getDate()+10);
         res.cookie(COOKIE_NAME,token,{
        path:"/",
         domain:"localhost",
        //  expires,
         httpOnly:true,
         signed:true,
        });
       
       console.log(users);
       return res.status(201).json({message:"OK",name:users.name,email:users.email});

   }
   catch(error){
    return res.status(200).json({message:"Error"});
   }
};



//user login

const userlogin=async(req:Request,res:Response,next:NextFunction)=>{
       try {
         const {email,password}= req.body;
         const user = await User.findOne({email});
         if(!user){
            return res.status(401).send("User Not Registered");
         }

         const isPasswordCorrect = await compare(password,user.password);
         if(!isPasswordCorrect){
            return res.status(403).send("Incorrect Password");
         }

        //first remove exist cookies
        res.clearCookie(COOKIE_NAME,{
            httpOnly:true,
            domain:"localhost",
            signed:true,
            path:"/"

        });
        // get token here

         const token  = createToken(user._id.toString(),user.email); //10
        //  const expires = new Date();

        //  expires.setDate(expires.getDate()+10);

         res.cookie("auth-token",token,{

        path:"/",
         domain:"localhost",
        //  expires,
         httpOnly:true,
         signed:true,
        });

         return res.status(200).json({message:"OK" , name:user.name,email:user.email});

       } catch (error) {
        console.log(error);
         return res.status(200).json({message:"ERROR",error});
       }
}




export const verifyUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {

      const user = await User.findById(res.locals.jwtData.id);

      if(!user){
         return res.status(401).send("User not Registerd Or Token Malfunctioned");
      }

      if(user._id.toString() !== res.locals.jwtData.id){
        return res.status(401).send("Permisson didn't match");
      }
    
      return res.status(200).json({message:"OK" , name:user.name,email:user.email});

    } catch (error) {
     console.log(error);
      return res.status(200).json({message:"ERROR",error});
    }
}

export const userLogout = async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{

  try {

    const user = await User.findById(res.locals.jwtData.id);
    if(!user){
      return res.status(401).send("User Not Registerd");
    }
    if(user._id.toString() !== res.locals.jwtData.id){
      return res.status(401).send("Permission didn't match");
    }

    res.clearCookie(COOKIE_NAME,{
      httpOnly:true,
      domain:"localhost",
      signed:true,
      path:"/"

    });

    return res.status(200).json({message:"OK",name:user.name,email:user.email});
    
  } catch (error) {
    console.log(error)
    return res.status(200).json({message:"Internal server error"});
    
  }

};

























export  {getAllusers,usersignup,userlogin};