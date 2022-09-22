import { Express } from "express";
import { checkForVideo, downloadVideoFromUrlHandler, findKeyWordHandler, videoUpload } from "../controller/video.controller";
import youtubeValidation from "../middleware/youtubeValidation";
import checkYoutubeValidation from "../middleware/checkYoutubeValidation";
import videoUploadData from "../middleware/videoUploadData";
import { searchDecode } from "../middleware/searchDecode";
const route = (app: Express) => {

    // url for video
    app.post("/api/video/upload/url", youtubeValidation, downloadVideoFromUrlHandler);

    // file upload
    app.post("/api/video/upload/file", videoUploadData, videoUpload);

    // search for file
    app.get("/api/video/search/:filename", checkYoutubeValidation, checkForVideo);

    // searach keyword
    app.get("/api/video/search/:filename/:keyword", searchDecode, findKeyWordHandler);
}

export default route;