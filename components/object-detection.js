"use client";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "../app/utils/render-predictions";




let detectInterval;

const ObjectDetection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load COCO model
  const runCoco = async () => {
    const net = await cocoSSDLoad();
    setIsLoading(false);

    detectInterval = setInterval(() => {
      runObjectDetection(net);
    }, 100);
  };

  // Object detection logic
  const runObjectDetection = async (net) => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 &&
      canvasRef.current
    ) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;

      // Match canvas size to video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");

      // Detect objects
      const detectedObjects = await net.detect(video, undefined, 0.6);

      // Draw predictions
      renderPredictions(detectedObjects, ctx);
    }
  };

  useEffect(() => {
    runCoco();
    return () => clearInterval(detectInterval);
  }, []);

  return (
    <div className="text-white mt-8">
      {isLoading && <div>Loading Model...</div>}

      <div className="relative flex justify-center items-center">
        {/* Webcam always mounted */}
        <Webcam
          ref={webcamRef}
          muted
          playsInline
          className="rounded-md"
          videoConstraints={{ facingMode: "environment" }}
        />

        {/* Canvas overlay */}
        <canvas
          ref={canvasRef}
          className="absolute left-0 top-0"
        />
      </div>
    </div>
  );
};

export default ObjectDetection;
