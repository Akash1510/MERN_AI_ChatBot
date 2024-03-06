// index.js

import dotenv from 'dotenv';
import {Request,Response,NextFunction } from 'express';
dotenv.config();

// Now your environment variables are available to use
import jwt from 'jsonwebtoken';

import {COOKIE_NAME} from './auth_token.js';

const jwt_secret = process.env.JWT_SECRET as string;

export const createToken = (id:string, email:string) => {  //expiresIn:string | number
    if (!jwt_secret) {
        throw new Error("JWT secret is not defined");
    }
    const payload = { id, email };
    const token = jwt.sign(payload, jwt_secret, {
        // expiresIn,
    });
    return token;
};

export const verifyToken = async(
    req:Request,
    res:Response,
    next:NextFunction
    )=>{
        const token = req.signedCookies[`${COOKIE_NAME}`];

        if( !token || token.trim() === ""){

            return res.status(401).json({message:"Token Not Receved"});
        }

        return new Promise<void>((resolve,reject)=>{
            return  jwt.verify(token,jwt_secret,(err: jwt.VerifyErrors | null, success: any)=>{
                if(err){
                    reject(err);
                    return res.status(401).json({message:"Token Expired"});
                }
                else{
                    console.log("Token Verification SuccessFul");
                    resolve();
                    res.locals.jwtData = success;
                    return next();

                }
            });
        });


}

// export const verifyToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//    // Assuming you have these environment variables set

//   const token = req.signedCookies[COOKIE_NAME] as string;

//   if (!token || token.trim() === "") {
//       return res.status(401).json({ message: "Token Not Received" });
//   }

//   try {
//       const decodedToken = jwt.verify(token, jwt_secret) as { [key: string]: any };
//       console.log("Token Verification Successful");
//       res.locals.jwt_secret = decodedToken;
//       next();
//   } catch (err) {
//       console.error("Token Verification Failed:");
//       return res.status(401).json({ message: "Token Expired or Invalid" });
//   }
// };


