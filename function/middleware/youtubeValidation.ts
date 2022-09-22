import { Request, Response, NextFunction } from "express";
import log  from "../logger/index";



const youtubeValidation = async (req: Request, res: Response, next: NextFunction) => {
    log.info(req.body.url)
    const url = req.body.url as string;
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length === 11) {
        req.user = match[2];
        return next();
    }
    return next();

}

export default youtubeValidation;