import styles from "./TrackItem.module.css";

interface Props {
  number: number;
  title: string;
  artist: string;
  onSelectTrack: () => void;
}

function TrackItem({ number, title, artist, onSelectTrack }: Props) {
  return (
    <li className={styles.container} onClick={onSelectTrack}>
      <div className={styles.info}>
        <span className={styles.number}>{number + 1}</span>
        <div className={styles.detail}>
          <span className={styles.title}>{title}</span>
          <span className={styles.artist}>{artist}</span>
        </div>
      </div>
    </li>
  );
}

export default TrackItem;
