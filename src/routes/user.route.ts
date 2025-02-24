import{ Request, Response, Router } from 'express';
import { userController } from '../controllers';

export const userRouter = Router();

userRouter.get("/", userController.get);

userRouter.post("/", userController.create2);

userRouter.get("/:id", userController.get);

userRouter.put("/:id", userController.update);

userRouter.delete("/:id", userController.delete);
