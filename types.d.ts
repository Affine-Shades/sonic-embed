interface Track {
  title: string;
  artist: string;
  artwork?: string;
  code?: string;
  src: string;
}

interface TimeRange {
  start: number;
  end: number;
}

interface TrackState {
  buffered: TimeRange[];
  duration: number;
  time: number;
  isPlaying: boolean;
  repeat: boolean;
  isLoading: boolean;
  error: boolean;
}

interface Controls {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}
