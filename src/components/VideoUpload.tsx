import { AddCircleRounded, AddIcCallOutlined } from "@mui/icons-material";
import { Button, CircularProgress, Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

function VideoUpload() {
    const navigate = useNavigate();
    const [file, setFile] = useState<File>();
    const [progress, setProgress] = React.useState(0);
    const [uploading, setUploading] = React.useState(false);
    const [fileType, setFileType] = useState("");
    const [fileName, setFileName] = useState("");
    const chunkSize = 10 * 1024;
    let currentChunkIndex = 0;
    // const [currentChunkIndex, setCurrentChunkIndex] = useState(null);
    useEffect(() => {
        const ext = file?.type?.split("video/").join("");
        if (ext) {
            setFileType(ext);
        }
        const name = v4();
        setFileName(name);
    }, [file]);
    const readAndUploadCurrentChunk = async () => {
        const reader = new FileReader();
        if (!file) {
            return;
        }
        const from = currentChunkIndex * chunkSize;
        const to = from + chunkSize;
        const blob = file.slice(from, to);
        reader.onload = async (e) => await uploadChunk(e);
        reader.readAsDataURL(blob);
    };

    const uploadChunk = async (e) => {
        const data = e.target.result;
        const params = new URLSearchParams();
        params.append("name", fileName);
        params.set("ext", fileType);
        params.set("size", file ? file.size.toString() : "");
        params.set("currentChunkIndex", currentChunkIndex.toString());
        params.set("totalChunks", (Math.ceil((file ? file.size : 0) / chunkSize)).toString());

        const req = {
            data: data
        };
        try {
            const res = await axios.post(
                `https://akshat-khosya-video-subtitle-x49wjxjwr69h6w7j-4000.githubpreview.dev/api/video/upload/file?${params.toString()}`,
                req
            );
            const fileSize = file ? file.size : 0;
            const isLastChunk = currentChunkIndex === Math.ceil(fileSize / chunkSize) - 1;
            if (isLastChunk) {
                navigate(`video/${res.data.fileName}`);
                return;
            } else {
                currentChunkIndex++;
                setProgress(
                    Math.ceil(((currentChunkIndex * chunkSize) / fileSize) * 100)
                );

                await readAndUploadCurrentChunk();
            }


        } catch (error) {
            console.log(error);
            setTimeout(async () => {
                await readAndUploadCurrentChunk();
            }, 2000);
        }
    }

    const upload = async () => {
        setUploading(true);
        await readAndUploadCurrentChunk();
    }
    return (
        <>
            <label htmlFor="upload-video">
                {!uploading && (<input
                    type="file"
                    required

                    onChange={(e) => { if (e?.target?.files) setFile(e?.target?.files[0]) }}
                    style={{ display: "none" }}
                    id="upload-video"
                    name="File Upload"

                    accept="video/*"

                />)}

                {!uploading && (
                    <Fab
                        color="secondary"
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended"
                    >
                        <AddCircleRounded /> Upload Video
                    </Fab>
                )}
                <br />

                <br />
                {file && (
                    <div>
                        {file.name}
                        <br />
                        <br />
                    </div>
                )}

                <Button onClick={upload} disabled={uploading} variant="contained">
                    {uploading === true ? (
                        <Box sx={{ display: "flex" }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        "Upload"
                    )}
                </Button>
                {progress !== 0 && <LinearProgressWithLabel value={progress} />}
            </label>
        </>
    );
}

export default VideoUpload;