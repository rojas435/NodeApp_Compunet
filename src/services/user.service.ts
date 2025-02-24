import { UserDocument, UserInput, UserModel } from "../models";
import bcrypt from "bcrypt";

class UserService {

    public async create(UserInput: UserInput): Promise<UserDocument> {
        try {
            const userExists: UserDocument | null  = await this.findByEmail(UserInput.email);
            if (userExists !== null) {
                throw new ReferenceError("User already exist");
            }
            UserInput.password = await bcrypt.hash(UserInput.password, 10);

            const user = await UserModel.create(UserInput);
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async update(id: string, userInput: UserInput): Promise<UserDocument | null> {
        try {
            const userExists = await UserModel.findById(id);
            if (!userExists) {
                throw new ReferenceError("User not found");
            }
    
            // if (userInput.password) {
            //     userInput.password = await bcrypt.hash(userInput.password, 10);
            // }
    
            const user = await UserModel.findByIdAndUpdate(id, userInput, { new: true });
            return user;
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

    

}


export const userService = new UserService();