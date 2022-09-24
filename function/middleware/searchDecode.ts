import { Request, Response, NextFunction } from "express";
import log from "../logger";

const searchDecode = (req: Request, res: Response, next: NextFunction) => {
    let { keyword } = req.params;
    
    keyword = keyword.replace("-", " ");
    keyword=keyword.toLowerCase();
    log.info(keyword);
    req.user = keyword;
    return next();
}

export {searchDecode}