import styles from "./Heading.module.css";

interface Props {
  level: 1 | 2;
  children: string;
}

function Heading({ level, children }: Props) {
  const ChosenLevel = `h${level}` as const;
  const className = level === 1 ? styles.heading : styles.subheading;

  return <ChosenLevel className={className}>{children}</ChosenLevel>;
}

export default Heading;