import IconButton from "../iconButton/IconButton";
import ForwardIcon from "../icons/forwardIcon/ForwardIcon";
import LoadingIcon from "../icons/loadingIcon/LoadingIcon";
import PauseIcon from "../icons/pauseIcon/PauseIcon";
import PlayIcon from "../icons/playIcon/PlayIcon";
import ReplayIcon from "../icons/replayIcon/ReplayIcon";
import styles from "./ButtonControls.module.css";

interface Props {
  isPlaying: boolean;
  isLoading: boolean;
  onSeekBackward: () => void;
  onPausePlay: () => void;
  onSeekForward: () => void;
}

function ButtonControls({
  isPlaying,
  isLoading,
  onSeekBackward,
  onPausePlay,
  onSeekForward,
}: Props) {
  return (
    <div className={styles.buttonContainer}>
      <IconButton onClick={onSeekBackward}>
        <ReplayIcon />
      </IconButton>
      {isLoading ? (
        <IconButton disabled={true}>
          <LoadingIcon />
        </IconButton>
      ) : (
        <IconButton onClick={onPausePlay}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </IconButton>
      )}
      <IconButton onClick={onSeekForward}>
        <ForwardIcon />
      </IconButton>
    </div>
  );
}

export default ButtonControls;
