import styles from "./Artwork.module.css";

interface Props {
  src: string;
}

function Artwork({ src }: Props) {
  return <img className={styles.image} src={src} alt="Cover" loading="lazy" />;
}

export default Artwork;
