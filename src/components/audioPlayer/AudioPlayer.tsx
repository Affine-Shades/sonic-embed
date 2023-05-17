import styles from "./AudioPlayer.module.css";
import Artwork from "../artwork/Artwork";
import Heading from "../heading/Heading";
import Scrubber from "../scrubber/Scrubber";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import TrackList from "../trackList/TrackList";
import { useState } from "react";
import ButtonControls from "../buttonControls/ButtonControls";
import { Track } from "../../types";
import CodeSnippet from "../codeSnippet/CodeSnippet";
import { Toaster } from "react-hot-toast";
import useShowError from "../../hooks/useShowError";

interface Props {
  data: Track[];
  showArtwork?: boolean;
}

function AudioPlayer({ data, showArtwork = false }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { title, artist, artwork, code, src } = data[currentIndex];
  const [ref, controls, state] = useAudioPlayer({
    src: src,
  });

  const handleSeekForward = () => controls.seek(state.time + 30);
  const handleSeekBackward = () => controls.seek(state.time - 30);
  const handlePausePlay = () => {
    state.isPlaying ? controls.pause() : controls.play();
  };

  const handleOnValueCommit = (value: number) => {
    requestAnimationFrame(() => {
      controls.seek(value);
    });
  };

  const handleSelectTrack = async (index: number) => {
    if (currentIndex === index) return;
    setCurrentIndex(index);
  };

  useShowError({ error: state.error });

  return (
    <div className={styles.container}>
      <Toaster />
      <audio ref={ref} preload="metadata" src={src} />
      <div className={styles.playerContainer}>
        {showArtwork && artwork && <Artwork src={artwork} />}
        <div className={styles.infoContainer}>
          <div className={styles.topLevelContainer}>
            <div className={styles.titleContainer}>
              <Heading level={1}>{title}</Heading>
              <Heading level={2}>{artist}</Heading>
            </div>
            {code && <CodeSnippet code={code} />}
          </div>
          <div className={styles.controlContainer}>
            <ButtonControls
              onPausePlay={handlePausePlay}
              onSeekBackward={handleSeekBackward}
              onSeekForward={handleSeekForward}
              isPlaying={state.isPlaying}
              isLoading={state.isLoading}
            />
            <Scrubber
              timePassed={state.time}
              duration={state.duration}
              onValueCommit={(newValue) => handleOnValueCommit(newValue)}
            />
          </div>
        </div>
      </div>
      {data.length > 1 && (
        <TrackList data={data} handleSelectTrack={handleSelectTrack} />
      )}
    </div>
  );
}

export default AudioPlayer;
