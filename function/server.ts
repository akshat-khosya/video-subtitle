import config from "./config/default";
import createServer from "./utils/app";
import log from "./logger";
const port = config.get("port") as number;
const app = createServer();

app.listen(port, () => {
    log.info(`Server is listening at ${port}`);
})
