import { throttle } from "lodash";

export const renderPredictions = (predictions, ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
  
    predictions.forEach((prediction) => {
      const [x, y, width, height] = prediction.bbox;
      const isPerson = prediction.class === "person";
  
      // Bounding box
      ctx.strokeStyle = isPerson ? "red" : "green";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);
  
      // Transparent fill
      ctx.fillStyle = `rgba(255,0,0, ${isPerson ? 0.2 : 0})`;
      ctx.fillRect(x, y, width, height);
  
      // Label background
      ctx.fillStyle = isPerson ? "red" : "green";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = 16;
  
      ctx.fillRect(x, y, textWidth + 6, textHeight + 6);
  
      // Label text
      ctx.fillStyle = "white";
      ctx.fillText(prediction.class, x + 3, y + 3);

      if (isPerson) {
        playAudio();
      }
    });
  };

  const playAudio = throttle(() => {
    const audio = new Audio('/alarm.mp3');
    audio.play();
  },2000); // Throttle to play at most once every 2 seconds

  