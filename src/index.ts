//let app =  require("express");

import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.route";
import { db } from "./lib/connectionDB";

dotenv.config();
const app : Express = express();
const port : number = process.env.PORT as any || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRouter);

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World");
})

app.get('/error', (req: Request, res: Response) => {
res.status(500).send("Server error mi pana");
})

app.get('/notFound', (req: Request, res: Response) => {
    res.status(404).send("Not found mi pana");
})



db.then(()=>
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
    } )
)
