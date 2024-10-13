import Queue from "bull";
import { config } from "./config";
import { JobData } from "../types";

export const jobQueue = new Queue<JobData>(
    "content-generation",
    config.redisUrl
);

jobQueue.process(async (job) => {});

jobQueue.on("completed", async (job, result) => {});
