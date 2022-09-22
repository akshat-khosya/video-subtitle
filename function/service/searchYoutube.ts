import { getSubtitlesContent } from "@drorgl/youtube-captions-scraper"
import axios from "axios";
import log from '../logger';

const searchYoutubeSubtitle = async (id: string) => {
    try {


        id = `https://video.google.com/timedtext?lang=en&v=${id}`;
        const res = await axios.post(id);
        log.info(res.data);
        // let youtubeCaptions =await getSubtitlesContent({videoID:id});
        // log.info(youtubeCaptions);
        // //retrieve caption tracks
        // let captionTracks = await youtubeCaptions.getCaptionTracks();
        // log.info(captionTracks);
        // //retrieve subtitles by language
        // let subtitles = await youtubeCaptions.getSubtitles('en' /*optional language*/);

        return [];
    } catch (error) {
        log.info(error);
        throw new Error((error as Error).message);
    }
};



export { searchYoutubeSubtitle };