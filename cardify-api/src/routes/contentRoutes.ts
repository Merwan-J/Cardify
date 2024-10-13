import { Router } from "express";

const contentRouter = Router();

contentRouter.get("/", () => {});
contentRouter.post("/", () => {});
contentRouter.get("/:id", () => {});
contentRouter.put("/:id", () => {});
contentRouter.delete("/:id", () => {});

export default contentRouter;
