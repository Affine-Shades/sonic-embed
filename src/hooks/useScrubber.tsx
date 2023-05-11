import { useEffect, useRef, useState } from "react";

// custom hook for updating scrubber (slider)

interface Props {
  timePassed: number;
  duration: number;
}

function useScrubber({ timePassed, duration }: Props) {
  const [sliderValue, setSliderValue] = useState(0);
  const canUpdate = useRef(true);

  useEffect(() => {
    if (canUpdate.current === true && timePassed) {
      requestAnimationFrame(() => setSliderValue(timePassed));
    }
  }, [timePassed]);

  useEffect(() => {
    setSliderValue(0);
  }, [duration]);

  return [sliderValue, setSliderValue, canUpdate] as const;
}

export default useScrubber;
