import { Router } from "express";
import * as UserController from "../controllers/userController";

const userRouter = Router();

userRouter.get("/:id/contents/", UserController.getUserContents);

export default userRouter;
