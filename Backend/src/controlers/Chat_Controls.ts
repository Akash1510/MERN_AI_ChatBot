// import { Request,Response,NextFunction } from "express";
// import User from "../models/user.js";
// import OpenAI from 'openai';






// export const generateChatComplition = async(
//     req:Request,
//     res:Response,
//     next:NextFunction
// )=>{

//     const {message} = req.body

//     try{
//         const user =await User.findById(res.locals.jwtData.id);
//         if(!user){
//             return res.status(401).json({message:"User Not Registerd"});
//         }

//         //grpp the chats

//         // const chats = user.Chats.map(({role,content})=>({
//         //     role,content
//         // })) 
          
//           const chats= user.Chats.map(({ role, content }) => ({
//             role,
//             content
//           })) as ChatComplitionRequestMessage[];
          

//         chats.push({role:"user",content:message});
//         user.Chats.push({role:"user",content:message});

//         //send all chat swith the new one to onppenAi Api
        
//         const openai = new OpenAI({
//             apiKey : process.env.OPEN_AI_SECRET,
//             organization:process.env.OPEN_AI_ORGANIZATION!,
//         })

//         const chatResponce = await openai.completions.create({
//             model:"gpt-3.5-turbo-instuct",
// //   messages:[
// //        {"role": "system", "content": "You are a helpful assistant."},
// //       {"role": "user", "content": "Who won the world series in 2020?"},
// //     {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
// //     {"role": "user", "content": "Where was it played?"}
// //   ],
//           prompt:chats,
// //   response_format: { type: "json_object" },
            
//         })

    
//         user.Chats.push(chatResponce.choices[0]);
//         console.log(chatResponce.choices[0])
//         await user.save();
//         return res.status(200).json({chats:user.Chats});
        
//     }

//     catch(err){
//         console.log(err);
//         return res.status(500).json({message:"Somthing Went Wrong"});
//     }
// }


// import { Request, Response, NextFunction } from "express";
// import User from "../models/user.js";
// import OpenAI from 'openai';

// export const generateChatCompletion = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     const { message } = req.body;

//     try {
//         const user = await User.findById(res.locals.jwtData.id);
//         if (!user) {
//             return res.status(401).json({ message: "User Not Registered" });
//         }

//         // Gather the existing chats
//         const chats = user.Chats.map(({ role, content }) => ({
//             role,
//             content
//         })) as {role:string,content:string}[];

//         // Add the new user message
//         chats.push({ role: "user", content: message });
//         user.Chats.push({ role: "user", content: message });

//         // Send all chats, including the new one, to the OpenAI API
//         const openai = new OpenAI({
//             apiKey: process.env.OPEN_AI_SECRET,
//             organization: process.env.OPEN_AI_ORGANIZATION!,
//         });

//         const chatResponse = await openai.completions.create({
//             model: "gpt-3.5-turbo-instruct",
//             prompt: chats,
//         });



//         // Save the assistant's response
//         user.Chats.push(chatResponse.choices[0]);
//         await user.save();

//         return res.status(200).json({ chats: user.Chats });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ message: "Something Went Wrong" });
//     }
// };



import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import OpenAI from 'openai';
import  {ChatCompletionMessageParam} from "openai/src/resources/index.js";

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
        })) as ChatCompletionMessageParam[];

        // Add the new user message
        chats.push({ role: "user", content: message });

        // Send all chats, including the new one, to the OpenAI API
        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_KEY,
            organization: process.env.OPEN_AI_ORGANIZATION,
        });

        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Use GPT-3.5-turbo model
            messages:chats
            
        });

        // Save the assistant's response
        user.Chats.push(chatResponse.choices[0].message);
        await user.save();

        return res.status(200).json({ chats: user.Chats });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};



export const sendChatUser = async(
    req:Request,
    res:Response,
    next:NextFunction,

)=>{


    try{
        const user  = await User.findById(res.locals.jwtData.id);

        if(!user){
            return res.status(401).send("User Not Registerd");
        }

    if(user._id.toString() !== res.locals.jwtData.id){
        return res.status(401).send("Permission Did'nt match");
    }
    return res.status(200).json({message:"ok",chats:user.Chats});

}
catch(err){
    console.log(err);
    return res.status(401).json({message:"Internal Server error"});
}
};


export const deleteChats = async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try{
        //check user token
        const user = await User.findById(res.locals.jwtData.id);

        if(!user){
            return res.status(401).send("User not registerd");
        }

        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("PerMission Didn't Match");
        }

        //@ts-ignore
        user.Chats = [];
        await user.save();
        return res.status(200).json({message:"ok"});
    }
    catch(err){
        console.log(err);
        return res.status(200).json({message:"Internal Server Error"});
    }
};

