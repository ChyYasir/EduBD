import React from "react";
import { useParams } from "react-router-dom";

const VideoDetail = () => {
  const params = useParams();
  console.log(params);
  return (
    <>
      <div className="mt-20">
        <h1>Video Detail</h1>
        <div className="p-4 flex justify-center items-center ">
          <iframe
            width="100%"
            height="550"
            src={`https://www.youtube.com/embed/${params.videoId}`}
            title="YouTube Video"
            frameborder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
