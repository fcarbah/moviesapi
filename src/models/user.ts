import { Document, Schema, model } from "mongoose";


export interface UserInterface extends Document{
    username:{
        type: String,
        unique: true,
        minlength:2
    },
    password: {
        type:String,
        minlength: 8
    }
};

export const UserSchema = new Schema({
    username:{
        type: String,
        unique: true,
        minlength:2
    },
    password: {
        type:String,
        minlength: 8
    }
});

export const User = model<UserInterface>("User", UserSchema);