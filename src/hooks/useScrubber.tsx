import { useEffect, useRef, useState } from "react";

// custom hook for updating scrubber (slider)

interface Props {
  timePassed: number;
}

function useScrubber({ timePassed }: Props) {
  const [sliderValue, setSliderValue] = useState(0);
  const canUpdate = useRef(true);

  useEffect(() => {
    if (canUpdate.current && timePassed) {
      requestAnimationFrame(() => setSliderValue(timePassed));            
    }
  }, [timePassed]);

  return [sliderValue, setSliderValue, canUpdate] as const;
}

export default useScrubber;
