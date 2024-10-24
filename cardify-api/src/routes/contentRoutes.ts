import { Router } from "express";
import * as ContentController from "../controllers/contentController";

const contentRouter = Router();

contentRouter.get("/", ContentController.getAllContents);
contentRouter.post("/", ContentController.createOneContent);
contentRouter.get("/:id", ContentController.getOneContent);
contentRouter.put("/:id", ContentController.updateOneContent);
contentRouter.delete("/:id", ContentController.deleteOneContent);

export default contentRouter;
