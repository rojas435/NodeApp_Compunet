import mongoose from "mongoose"

export interface UserInput{
    name: string,
    email: string,
    password: string // EL ? significa que es opcional
}

export interface UserInputUpdate{
    name: string,
    email: string,
}

export interface userLogin{
    email: string,
    password: string
}

export interface UserLoginResponse{
    user?: {
        name: string,
        email: string,
        role: string[],
        token: string
    },
    message: {
        contents: string,
        code: number}
}

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