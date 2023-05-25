export interface Track {
  title: string;
  artist: string;
  artwork?: string;
  code?: string;
  src: string;  
}

export interface TimeRange {
  start: number;
  end: number;
}

export interface TrackState {
  buffered: TimeRange[];
  duration: number;
  time: number;
  isPlaying: boolean;
  repeat: boolean;
  isLoading: boolean;
  error: boolean;
}

export interface Controls {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}