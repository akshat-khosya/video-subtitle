import  { Request, Response, NextFunction } from "express";
import log from "../logger/index";
import { getFromMap } from "../service/cache.service";



const checkYoutubeValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { filename } = req.params;
    const output = getFromMap(filename);
    if (output === true) {
        return res.status(200).json({ msg: "Video is being processed" });
    } else if (output === false) {
        return res.status(400).json({ msg: "No subtitles found" });
    }
    if (filename.length === 11) {
        req.user = filename;
        return next();
    }
    return next();

}

export default checkYoutubeValidation;