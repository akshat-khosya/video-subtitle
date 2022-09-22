import { Request, Response, NextFunction } from "express";
import log from "../logger/index";
import { Buffer } from 'node:buffer';
import { v4 as uuidv4 } from 'uuid';
import md5 from "md5";
import path from 'path';

const videoUploadData = async (req: Request, res: Response, next: NextFunction) => {

    // const { name, ext, currentChunkIndex, totalChunks } = req.query;
    const currentChunkIndex = req.query.currentChunkIndex as string;
    const totalChunks = req.query.totalChunks as string;
    log.info(currentChunkIndex);
    log.info(totalChunks);
    const name = req.query.name as string;
    const firstChunk = parseInt(currentChunkIndex) === 0;
    const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunks)-1;
    let data = req.body.data;
    let newData = data.toString().split(",")[1];
    const buffer = Buffer.from(newData, "base64");
    let videoData = {
        firstChunk: firstChunk,
        lastChunk: lastChunk,
        name: name,
        ext: req.query.ext as string,
        buffer: buffer,
        folderPath: "",
        videoPath: "",
    }
    videoData.folderPath = path.resolve("video", videoData.name);
    let tempFilename = 'temp_' + md5(name + req.ip) + '.' + videoData.ext;
    tempFilename = path.resolve(videoData.folderPath, tempFilename);
    videoData.videoPath = tempFilename;
    req.user = videoData;
    return next();
}

export default videoUploadData;