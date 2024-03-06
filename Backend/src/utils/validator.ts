import { NextFunction,Request,Response } from "express";
import { ValidationChain, body,validationResult } from "express-validator";


const validate = (validations:ValidationChain[])=>{

  return async(req:Request,res:Response,next:NextFunction)=>{
    for(let validation of validations){
        const result = await validation.run(req);
        if(!result.isEmpty()){
          break;
        }
    }
    const error = validationResult(req);
    if(error.isEmpty()){
      return next();
    }

      return res.status(422).json({errors:error.array()});
  

  }

  
  
}

const  loginvalidator =[    
        body("email").trim().isEmail().notEmpty().withMessage("Email is Required "),
        body("password").trim().isLength({min:8}).withMessage("Password Should Contain atleast 8 Characters")

    
];

const signupvalidator =[    
        body("name").notEmpty().withMessage("Name is Required"),
        ...loginvalidator,

    
]


export const chatComplitionValidator=[
  body("message").notEmpty().withMessage("Message is Required"),
];


export  {signupvalidator ,loginvalidator, validate};