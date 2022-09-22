import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from '@mui/material';
// import CircularProgress from '../components/CircularProgress';
function Search() {
  // const location = useLocation();
  // const fileName = location.pathname.split("/")[2];
  const { videoId } = useParams();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    console.log(videoId);

    const checkSub = async () => {
      try {
        const res = await axios.get(`http://10.0.3.159:4000/api/video/search/${videoId}`);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        setNotFound(true);
        console.log(error);
        setLoading(false);
      }
    }
    checkSub();
  }, [videoId]);
  
  return (
    <>
      {loading ? (<CircularProgress />) : (
        <div>{!notFound ? "Search" : "404 Not found"}</div>
      )
      }
      {/* {loading ? (<CircularProgress />) : (<div>Hello</div>)} */}
    </>

  )
}

export default Search