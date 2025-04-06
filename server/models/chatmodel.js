import mongoose, {Schema} from "mongoose";

const MessageSchema = new Schema({
    sender_id: {
        type: Schema.Types.ObjectId,
        ref: "User_ce"
    },
    reciepient_id: {
        type: Schema.Types.ObjectId,
        ref: "User_ce"
    },
    message: {
        type: String, 
        required: true
    }
}, {timestamps: true})

export const Message = mongoose.model("Message", MessageSchema)