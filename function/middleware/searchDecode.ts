import { Request, Response, NextFunction } from "express";

const searchDecode = (req: Request, res: Response, next: NextFunction) => {
    let { keyword } = req.params;
    keyword = keyword.replace("_", " ");
    keyword=keyword.toLowerCase();
    req.user = keyword;
}

export {searchDecode}