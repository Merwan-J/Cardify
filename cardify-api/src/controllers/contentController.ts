import { Request, Response } from "express";
import { RequestBody, RequestQuery } from "../types";
import {
    getContents,
    getContent,
    createContent,
    updateContent,
    deleteContent,
} from "../db/contents";
import logger from "../utils/logger";

export async function getAllContents(req: Request, res: Response) {
    const query: RequestQuery = req.query;

    try {
        const contents = await getContents({ type: query.type });
        res.status(200).json(contents);
    } catch (error) {
        logger.error({ ...query }, "Error getting contents");
        res.status(400).json({ message: "Error getting contents" });
    }
}
export async function getOneContent(req: Request, res: Response) {
    const id = req.params.id;

    try {
        const content = await getContent({ id });
        res.status(200).json(content);
    } catch (error) {
        logger.error({ id }, "Error getting content");
        res.status(400).json({ message: "Error getting content" });
    }
}
export async function createOneContent(req: Request, res: Response) {
    const contentData: RequestBody = req.body;
    try {
        const content = await createContent({
            content: contentData,
        });
        res.status(200).json(content);
    } catch (error) {
        logger.error(contentData, "Error creating content");
        res.status(400).json({ message: "Error creating content" });
    }
}
export async function updateOneContent(req: Request, res: Response) {
    const id = req.params.id;
    const title = req.body.title;

    try {
        const content = await updateContent({ id, title });
        res.status(200).json(content);
    } catch (error) {
        logger.error({ id, title }, "Error updating content");
        res.status(400).json({ message: "Error updating content" });
    }
}
export async function deleteOneContent(req: Request, res: Response) {
    const id = req.params.id;

    try {
        const content = await deleteContent({ id });
        res.status(200).json(content);
    } catch (error) {
        logger.error({ id }, "Error deleting content");
        res.status(400).json({ message: "Error deleting content" });
    }
}
