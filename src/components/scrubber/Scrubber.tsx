import styles from "./Scrubber.module.css";
import { Slider } from "antd";
import { parseToMinutes } from "../../utils/timeUtils";
import useScrubber from "../../hooks/useScrubber";

interface Props {
  timePassed: number;
  duration: number;
  onValueCommit: (newValue: number) => void;
}

function Scrubber({ timePassed, duration, onValueCommit }: Props) {
  const [sliderValue, setSliderValue, canUpdate] = useScrubber({
    timePassed,
    duration,
  });

  return (
    <div className={styles.container}>
      <span className={styles.time}>{parseToMinutes(sliderValue)}</span>
      <Slider
        className={styles.slider}
        trackStyle={{ backgroundColor: "var(--slider-track-colour)" }}
        railStyle={{ backgroundColor: "var(--slider-range-colour)" }}
        tooltip={{ open: false }}
        defaultValue={0}
        min={0}
        max={duration}
        aria-label="Scrubber"
        value={sliderValue}
        onChange={(newValue) => {
          canUpdate.current = false;
          setSliderValue(newValue);
        }}
        onAfterChange={(newValue) => {
          onValueCommit(newValue);
          canUpdate.current = true;
        }}
      />

      <span className={styles.time}>{parseToMinutes(duration)}</span>
    </div>
  );
}

export default Scrubber;
