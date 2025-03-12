import { Request, Response } from "express";
import { UserDocument, UserModel } from "../models";
import {  UserInput, userLogin } from "../interfaces";
import { userService } from "../services";
import { AuthError } from "../exceptions";

class Usercontroller{


    //NO hacer
    public async create2 ( req : Request, res : Response){
        try{
            const newUser = await userService.create(req.body as UserInput);
            res.status(201).json(newUser);
        }catch(error){
            if(error instanceof ReferenceError){
                res.status(400).json({message: "User already exist"});
                return;
            }
            res.status(500).json(error);
        }
    }

    //NO hacerNO NO SQUARE

    // public create ( req : Request, res : Response){
    //     res.status(201).send("create user");
    // }

    public async get ( req : Request, res : Response){
        try {
            const id: number = +req.params.id; // se puede escribir parseInt(req.params.id)
            const user: UserDocument | null = await userService.findById(req.params.id);
            if(user === null){
                res.status(404).json({message: `User not found ${id} not found`});
                return;
            }
            res.json(user);
        } catch (error) {
            throw error;
            
        }
        res.send(`Get user with id ${req.params.id}`);
    }

    public async getAll ( req : Request, res : Response){ 
        try{
            const user: UserDocument[] = await userService.findAll();
        }catch(error){
            res.status(500).json(error);
        }

        res.send("Get all users");
    }

    public async update ( req : Request, res : Response){
        try {
            const id: string = req.params.id;
            const user: UserDocument | null = await userService.update(id, req.body as UserInput);
            if(user === null){
                res.status(404).json({message: `User not found ${id} not found`});
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    public async delete ( req: Request, res : Response){
       try {
        const id: string = req.params.id;
        const user: UserDocument | null = await userService.delete(id);
        if(user === null){
            res.status(404).json({message: `User not found ${id} not found`});
            return;
        }
        res.json(user);
       } catch (error) {
            res.status(500).json(error);
       }
    }

    public async login(req: Request, res: Response){
        try {
            const resObj = await userService.login(req.body as userLogin);
            res.status(200).json(resObj);

        } catch (error) {
            if(error instanceof AuthError){
                res.status(401).json({message: "User not authorized"});
                return;
            }
            //NO autorizado
            res.status(500).json(error);
        }
    }


}
export const userController = new Usercontroller()