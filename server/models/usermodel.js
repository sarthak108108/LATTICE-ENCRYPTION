import { Schema } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    loginkey: {
        type: String,
        required: true
    },
    public_key: {
        type: String,
        unique: true
    }
}, {timestamps: true})

export const User = mongoose.model("User_ce", UserSchema)
