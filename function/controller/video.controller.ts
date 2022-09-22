import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";
import log from "../logger";
import { searchYoutubeSubtitle } from "../service/searchYoutube";
import { downloadVideoFromUrl, videoUrlValidation } from "../service/video.service";
import path from "path";
import { searchVideoSubtitle, videoSearch } from "../service/videoFiles.service";
import { addToMap } from "../service/cache.service";
const downloadVideoFromUrlHandler = async (req: Request, res: Response) => {
    try {
        if (req.user) {
            log.info(req.user);
            return res.status(200).json({ link: req.user });
        }
        const url = await videoUrlValidation(req.body.url);
        if (url.links.length === 0) {
            return res.status(422).json({ msg: "Inavlid Link" });
        }
        let name = uuidv4();
        let folderName = name;
        let extenion = url.links[0].text;
        let remove = url.links[0].video_format;
        remove = remove.replace('video format: ', '');

        extenion = extenion.replace(` ${remove}`, '');
        extenion = extenion.toLowerCase();
        name = `${name}.${extenion}`;
        const file = await downloadVideoFromUrl(url.links[0].href, name, folderName, res);
    } catch (error) {
        return res.status(404).json({ msg: "Invalid Link" });
    }


}

const checkForVideo = async (req: Request, res: Response) => {


    if (req.user) {
        try {
            const sub = await searchYoutubeSubtitle(req.user);
            if (sub.length === 0) {
                return res.status(404).json({ msg: "Video not found" });
            }
        } catch (error) {

            return res.status(404).json({ msg: "Video not found" });
        }
    }

    const sub = searchVideoSubtitle(req.params.filename);
    log.info(sub);
    if (sub.length === 0) {

        return res.status(404).json({ msg: "Video not found" });
    }

    addToMap(req.params.filename, sub.length === 0 ? false : true);
    return res.status(200).json({ msg: "Video found" });

}

const videoUpload = async (req: Request, res: Response) => {
    const videoData = req.user as {
        firstChunk: boolean;
        lastChunk: boolean;
        name: string;
        ext: string;
        buffer: Buffer;
        folderPath: string;
        videoPath: string;
    };
    if (videoData.firstChunk) {
        fs.mkdirSync(videoData.folderPath);
    }
    if (videoData.firstChunk && fs.existsSync(videoData.videoPath)) {
        fs.unlinkSync(videoData.videoPath);
    }
    fs.appendFileSync(videoData.videoPath, videoData.buffer);
    if (videoData.lastChunk) {
        const fileName = videoData.name + '.' + videoData.ext;
        log.info(fileName);
        const newPath = path.resolve(videoData.folderPath, fileName);
        log.info(newPath);
        fs.renameSync(videoData.videoPath, newPath);
        return res.status(200).json({ fileName: fileName });
    }
    return res.status(200).json({ msg: "Chunk Uploaded" });

}

const findKeyWordHandler = async (req: Request, res: Response) => {
    const sub = searchVideoSubtitle(req.params.filename);
    if (sub === undefined || sub.length === 0) {
    
        return res.status(404).json({ msg: "Video not found" });
    }
   
    const results =await videoSearch(sub, req.params.keyword);
    log.info(results);
    return res.status(200).json({ results: results });
}


export { downloadVideoFromUrlHandler, checkForVideo, videoUpload, findKeyWordHandler };

