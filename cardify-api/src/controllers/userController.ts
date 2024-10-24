import { Request, Response } from "express";
import { getContents } from "../db/contents";
import { RequestQuery } from "../types";
import logger from "../utils/logger";

export async function getUserContents(req: Request, res: Response) {
    const userId = req.params.id;
    const params: RequestQuery = req.query;
    try {
        const contents = await getContents({ userId, ...params });
        res.status(200).json(contents);
    } catch (error) {
        const message = "Error getting Contents";
        logger.error({ userId, ...params }, message);
        res.status(400).json({ message });
    }
}
