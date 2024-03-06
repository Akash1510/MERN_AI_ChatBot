import mongoose, { Schema } from "mongoose";
import { randomUUID } from "crypto";

// Define the schema for Chats
const chatsSchema = new Schema({
    id: {
        type: String,
        default: randomUUID() // Generating a random UUID as default value for id
    },
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

// Define the schema for User
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensuring email is unique
    },
    password: {
        type: String,
        required: true
    },
    Chats: [chatsSchema] // Embedding Chats schema as an array within User schema
});

export default mongoose.model("User", userSchema);
