import styles from "./TrackList.module.css";
import TrackItem from "../trackItem/TrackItem";

interface Props {  
  data: Track[];
  handleSelectTrack: (index: number) => void;
}

function TrackList({ data, handleSelectTrack }: Props) {
  return (
    <ul className={styles.container}>
      {data.map((item, index) => (
        <TrackItem
          key={index}
          onSelectTrack={() => handleSelectTrack(index)}
          number={index}
          title={item.title}
          artist={item.artist}
        />
      ))}
    </ul>
  );
}

export default TrackList;
