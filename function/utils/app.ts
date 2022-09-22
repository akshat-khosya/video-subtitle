import express from "express";
import routes from "../routes";
import cors from "cors";

function createServer() {
    const app = express();

    const options: cors.CorsOptions = {
        origin: "*"
    };

    app.use(cors(options));

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    routes(app);

    return app;
}

export default createServer;