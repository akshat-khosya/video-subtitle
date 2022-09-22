import { Request, Response, NextFunction } from "express";
import log from "../logger";

const searchDecode = (req: Request, res: Response, next: NextFunction) => {
    let { keyword } = req.params;
    log.info(keyword);
    keyword = keyword.replace("_", " ");
    keyword=keyword.toLowerCase();
    req.user = keyword;
    return next();
}

export {searchDecode}