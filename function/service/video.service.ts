import fs from 'fs';
import path from 'path';
import axios from 'axios';
import log from '../logger';
import { Response } from 'express';
import avd from '../utils/avd';


const downloadVideoFromUrl = async (url: string, fileName: string, folderName: string, res: Response) => {


    const folderPath = path.resolve("video", folderName);
    fs.mkdirSync(folderPath);
    const localFilePath = path.resolve("video", folderName, fileName);
    log.info(localFilePath);
    try {
        const response = await axios({
            method: "GET",
            url: url,
            responseType: "stream"
        });
        const w = response.data.pipe(fs.createWriteStream(localFilePath));
        w.on('finish', () => {
            log.info('Successfully downloaded file!');
            return res.status(200).json({ link: fileName });
        });
        return false;
    } catch (error) {
        log.error(error);
        return false;
    }
}

const videoUrlValidation = async (url: string) => {
    try {
        const genrateurl = await avd(url) as { info: { title: string, thub: string, duration: string }, links: { video_format: string, href: string, text: string }[] };
        return genrateurl;

    } catch (error) {
        throw new Error((error as Error).message);
    }
}


export { downloadVideoFromUrl, videoUrlValidation };