import { UserInput, userLogin, UserLoginResponse, UserInputUpdate } from "../interfaces";
import { UserDocument, UserModel } from "../models";
import { AuthError } from "../exceptions";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {

    public async create(UserInput: UserInput): Promise<UserDocument> {
        try {
            const userExists: UserDocument | null  = await this.findByEmail(UserInput.email);
            if (userExists !== null) {
                throw new ReferenceError("User already exist");
            }
            if(UserInput.password)
                UserInput.password = await bcrypt.hash(UserInput.password, 10);

            const user = await UserModel.create(UserInput);
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async update(id: string, userInput: UserInputUpdate): Promise<UserDocument | null> {
        try {
            const user: UserDocument | null = await UserModel.findByIdAndUpdate({_id: id}, userInput, { returnOriginal: false });
            if(user){
                user.password = "";
            }
            return user;
    
            // if (userInput.password) {
            //     userInput.password = await bcrypt.hash(userInput.password, 10);
            // }

        } catch (error) {
            throw error;
        }
    }

    public async findByEmail(email: string): Promise <UserDocument | null> {
        try {
            const user = await UserModel.findOne({email});
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<UserDocument[]> {
        try {
            const users: UserDocument[] = await UserModel.find();
            return users;

        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<UserDocument | null> {
        try {
            const user: UserDocument | null = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<UserDocument | null> {
        try {
            const user: UserDocument | null = await UserModel.findByIdAndDelete(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async login(userLogin: userLogin): Promise<UserLoginResponse | undefined> {
        try {
            const userExists: UserDocument | null = await this.findByEmail(userLogin.email);
            if (userExists === null) {
                throw new AuthError("User already exists");

            }
            const isMatch: boolean = await bcrypt.compare(userLogin.password, userExists.password);
        
            if(!isMatch){
                throw new AuthError("Not authorized");
                console.log("NO hacen match")
            }
            return{
                user: {
                    id: userExists.id,
                    name: userExists.name,
                    email: userExists.email,
                    role: ["admin"],
                    token: this.generateToken(userExists.email)
                }
            }
            
        } catch (error) {
            throw error;
        }
        
    }

    public generateToken(email: string): string {
        try {
            return jwt.sign({user: {email}}, process.env.JWT_SECRET || "secret", {expiresIn: "10m"});
        } catch (error) {
            throw error;
        }
    }

    

}


export const userService = new UserService();