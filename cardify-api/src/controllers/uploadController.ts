import { Request, Response } from "express";
import { RequestBody } from "../types";
import { jobQueue } from "../utils/jobQueue";

export const uploadController = async (req: Request, res: Response) => {
    const body: RequestBody = req.body;
    try {
        const job = jobQueue.add(body);
    } catch (error) {}
};
