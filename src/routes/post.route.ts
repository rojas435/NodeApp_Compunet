import{ Request, Response, Router } from 'express';

export const postRouter = Router();

postRouter.get("/", (req: Request, res: Response)=>{res.send("Get all posts")});

postRouter.post("/", (req: Request, res: Response)=>{res.send("Get all posts")});

postRouter.get("/:id", (req: Request, res: Response)=>{res.send("Get all posts")});

postRouter.put("/:id", (req: Request, res: Response)=>{res.send("Get all posts")});

postRouter.delete("/:id", (req: Request, res: Response)=>{res.send("Get all posts")});
