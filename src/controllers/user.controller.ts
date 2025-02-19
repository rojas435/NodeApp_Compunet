import { Request, Response } from "express";
import User from "../models/user.models";

class Usercontroller{


    //NO hacer
    public async creacte ( req : Request, res : Response){
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);

    }

    //NO hacer

    public create ( req : Request, res : Response){
        res.status(201).send("create user");
    }

    public get ( req : Request, res : Response){
        res.send(`Get user with id ${req.params.id}`);
    }

    public getAll ( req : Request, res : Response){ 
        res.send("Get all users");
    }

    public update ( req : Request, res : Response){
        res.send(`update user wit id ${req.params.id}`);
    }
    
    public delete ( req: Request, res : Response){
        res.send(`Delete user with id ${req.params.id}`);
    }
}
export const userController = new Usercontroller()