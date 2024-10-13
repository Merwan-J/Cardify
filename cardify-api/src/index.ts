import express from "express";
import { config } from "./utils/config";
import morgan from "morgan";
import contentRouter from "./routes/contentRoutes";
import logger from "./utils/logger";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/content", contentRouter);

app.listen(config.port, () => {
    logger.info(
        `[server]: Server is running at http://localhost:${config.port}`
    );
});

export default app;
