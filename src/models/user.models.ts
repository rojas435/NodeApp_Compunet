import mongoose from "mongoose"

export interface UserInput{
    name: string,
    email: string,
    password: string
}

export interface USerDocument extends UserInput, mongoose.Document{
    createdAt: Date,
    updateAt: Date,
    deleteAt: Date
}

const userSchem = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: true, unique: true},
    password: {type: String, required: true},
},{timestamps: true, collection: "users"});
const User = mongoose.model<USerDocument>("User", userSchem);

export default User;