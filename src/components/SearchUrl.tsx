import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function SearchUrl() {
    const navigate = useNavigate();
    const [url, setUrl] = React.useState("");
    const [progress, setProgress] = React.useState(false);
    const sendUrl = async () => {
        setProgress(() => true);
        try {
            const res = await axios.post("http://10.0.3.159:4000/api/video/upload/url", { url: url });
            setTimeout(() => {
                navigate(`video/${res.data.link}`)
            }, 1000)
        } catch (error) {
            alert('Invalid Link');
            setProgress(false);
            console.log(error);
        }
    }
    return (
        <div
            style={{
                width: "100%",
            }}
        >
            <h2>Enter url</h2>

            <TextField
                value={url}
                id="standard-basic"
                label="Standard"
                variant="standard"
                style={{
                    width: "80%",
                    marginRight: "2rem",
                }}
                onChange={(e) => { setUrl(() => e.target.value) }}
                inputProps={{
                    style: {
                        width: "100%",
                    },
                }}
            />

            <Button onClick={sendUrl} variant="contained">Submit</Button>
        </div>
    )
}

export default SearchUrl