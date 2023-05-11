import { TimeRange } from "../types";

export const parseToMinutes = (seconds: number): string => {
  const min = Math.floor(seconds / 60);
  const formattedMinutes = min < 10 ? `0${min}` : `${min}`;
  const sec = Math.floor(seconds % 60);
  const formattedSeconds = sec < 10 ? `0${sec}` : `${sec}`;
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const parseTimeRanges = (ranges: TimeRanges): TimeRange[] => {
  const result: { start: number; end: number }[] = [];

  for (let i = 0; i < ranges.length; i++) {
    result.push({
      start: ranges.start(i),
      end: ranges.end(i),
    });
  }

  return result;
};
