"use client";
import React, { use, useRef } from "react";
import Webcam from "react-webcam";

const ObjectDetection = () => {
    const webcamRef = useRef(null);
     
     const showmyVideo = () => {
        if (webcamRef.current !== null && webcamRef.current.video?.readyState===4) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
        };

  return (
    <div className="text-white mt-8">
      <div className="relative flex justify-center items-center gradient-border p-1.5 rounded-md"> 
        {/* Webcam */}
        <Webcam 
        ref={webcamRef}
        className="rounded-md w-full lg:h-[720px]" muted  /> 
        {/* canvas */}
      </div>
    </div>
  );
};

export default ObjectDetection;
