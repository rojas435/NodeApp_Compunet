import mongoose from "mongoose"
import { UserInput } from "../interfaces"; 


export interface UserDocument extends UserInput, mongoose.Document{
    createdAt: Date,
    updateAt: Date,
    deleteAt: Date
}


const userSchem = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: true, unique: true},
    password: {type: String, required: true},
},{timestamps: true, collection: "users"});

export const UserModel = mongoose.model<UserDocument>("User", userSchem);