import User from "../models/user.js";
import { hash, genSalt, compare } from 'bcrypt'; //use for the password hashing 
import { createToken } from "../utils/token_manager.js";
import { COOKIE_NAME } from "../utils/auth_token.js";
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";
const getAllusers = async (req, res, next) => {
    //get all the users
    try {
        const user = await User.find();
        return res.status(200).json({ message: "OK", user });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR" });
    }
};
// user sign up
const usersignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const salt = await genSalt(10);
        const exist_User = await User.findOne({ email });
        if (exist_User) {
            return res.status(401).send("User is already Registerd");
        }
        const hashPassword = await hash(password, salt);
        const users = new User({ name, email, password: hashPassword });
        await users.save();
        //create the cookie and store it 
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        // get token here
        const token = createToken(users._id.toString(), users.email); //"10"
        //  const expires = new Date();
        //  expires.setDate(expires.getDate()+10);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            //  expires,
            httpOnly: true,
            signed: true,
        });
        console.log(users);
        return res.status(201).json({ message: "OK", name: users.name, email: users.email });
    }
    catch (error) {
        return res.status(200).json({ message: "Error" });
    }
};
//user login
const userlogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User Not Registered");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        //first remove exist cookies
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        // get token here
        const token = createToken(user._id.toString(), user.email); //10
        //  const expires = new Date();
        //  expires.setDate(expires.getDate()+10);
        res.cookie("auth-token", token, {
            path: "/",
            domain: "localhost",
            //  expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", error });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not Registerd Or Token Malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permisson didn't match");
        }
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", error });
    }
};
export const userLogout = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User Not Registerd");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission didn't match");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Internal server error" });
    }
};
export const Forgot_Password = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne(email);
        if (!user) {
            return res.status(401).json({ message: "User not Exist" });
        }
        const secret = process.env.JWT_SECRET + user.password;
        const token = jwt.sign({ email: user.email, id: user._id }, secret, {
            expiresIn: '5m'
        });
        return token;
    }
    catch (err) {
        console.log("Email is Got");
        return res.status(500).json({ message: "Email Got" });
    }
};
export const sendmail = async (req, res, next) => {
    const { email, subject, message } = req.body;
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'email',
            pass: 'password'
        }
    });
    const mailOptions = {
        from: 'sendermail',
        to: email,
        subject: subject,
        text: message
    };
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal server Error");
        }
        else {
            console.log("Email Sent " + info.response);
            res.status(200).json({ message: "Email sent SuccessFully " });
        }
    });
};
export { getAllusers, usersignup, userlogin };
//# sourceMappingURL=user_controls.js.map