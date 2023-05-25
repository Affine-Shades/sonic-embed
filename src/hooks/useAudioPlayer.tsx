import { useCallback, useEffect, useRef, useState } from "react";
import { parseTimeRanges } from "../utils/timeUtils";
import { TrackState, Controls } from "../types";

// custom hook for handling HTMLAudioElement
// returns an array of ref, track state, and controls

interface Props {
  src: string;
}

function useAudioPlayer({ src }: Props) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<TrackState>({
    buffered: [],
    duration: 0,
    time: 0,
    isLoading: false,
    isPlaying: false,
    repeat: false,
    error: false,
  });

  let lockPlay = false;

  const onStartedLoading = () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
  };

  const onFinishedLoading = () => {
    setState((prevState) => ({ ...prevState, isLoading: false }));
  };

  const onPlay = () => {
    setState((prevState) => ({ ...prevState, isPlaying: true }));
  };

  const onPause = () => {
    setState((prevState) => ({ ...prevState, isPlaying: false }));
  };

  const onEmptied = () => {
    setState((prevState) => ({
      ...prevState,
      isPlaying: false,
    }));
  };

  const onLoadedMetadata = () => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const { duration, buffered } = el;
    setState((prevState) => ({
      ...prevState,
      duration: duration,
      buffered: parseTimeRanges(buffered),
      error: false,
    }));
  };

  const onProgress = () => {
    const el = ref.current;
    if (!el) {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      buffered: parseTimeRanges(el.buffered),
    }));
  };

  const onTimeUpdate = useCallback(() => {
    const el = ref.current;
    if (el) {
      setState((prevState) => ({ ...prevState, time: el.currentTime }));
    }
  }, [ref]);

  const onError = () => {
    setState((prevState) => ({ ...prevState, error: true }));
  };

  const controls: Controls = {
    play: () => {
      const el = ref.current;
      if (!el) return;

      // Some browsers return `Promise` on `.play()` and may throw errors
      // if one tries to execute another `.play()` or `.pause()` while that
      // promise is resolving.
      // See: https://github.com/streamich/react-use/blob/325f5bd69904346788ea981ec18bfc7397c611df/src/factory/createHTMLMediaHook.ts#L22

      if (!lockPlay) {
        const promise = el.play();
        const isPromise = typeof promise === "object";

        if (isPromise) {
          lockPlay = true;
          const resetLock = () => (lockPlay = false);
          promise.then(resetLock, resetLock);
        }
        onPlay();
        return promise;
      }
      return undefined;
    },
    pause: () => {
      const el = ref.current;
      if (el && !lockPlay) {
        onPause();
        return el.pause();
      }
    },
    seek: (time: number) => {
      const el = ref.current;
      if (!el || state.duration === undefined) {
        return;
      }
      time = Math.min(state.duration, Math.max(0, time));
      el.currentTime = time;
    },
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("loadedmetadata", onLoadedMetadata);
    el.addEventListener("progress", onProgress);
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("ended", onPause);
    el.addEventListener("canplay", onFinishedLoading);
    el.addEventListener("emptied", onEmptied);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("seeking", onStartedLoading);
    el.addEventListener("seeked", onFinishedLoading);
    el.addEventListener("loadeddata", onFinishedLoading);
    el.addEventListener("error", onError);

    return () => {
      el.removeEventListener("loadedmetadata", onLoadedMetadata);
      el.removeEventListener("progress", onProgress);
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("ended", onPause);
      el.removeEventListener("canplay", onFinishedLoading);
      el.removeEventListener("emptied", onEmptied);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("seeking", onStartedLoading);
      el.removeEventListener("seeked", onFinishedLoading);
      el.removeEventListener("loadeddata", onFinishedLoading);
      el.removeEventListener("error", onError);
    };
  }, [src, onTimeUpdate, ref]);

  return [ref, controls, state] as const;
}

export default useAudioPlayer;
