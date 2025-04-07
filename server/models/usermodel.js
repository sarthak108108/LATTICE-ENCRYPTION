import { Schema } from "mongoose";
import mongoose from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    login_key: {
        type: String
    },
    public_key: {
        type: String,
        unique: true
    }
}, {timestamps: true})

export const User = mongoose.model("User_ce", UserSchema)
