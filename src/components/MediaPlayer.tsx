import { forwardRef } from "react";

import media from "../assets/earth.mp4";
import { mediaClass } from "./MediaPlayer.css";

type Props = {};

// eslint-disable-next-line react/display-name
const MediaPlayer = forwardRef<HTMLMediaElement, Props>((props, ref) => {
  return (
    <div>
      <video ref={ref} className={mediaClass}>
        <source src={media} type="video/mp4" />
      </video>
    </div>
  );
});

export default MediaPlayer;
