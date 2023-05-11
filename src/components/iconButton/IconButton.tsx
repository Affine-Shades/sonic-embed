import { ReactNode } from "react";
import styles from "./IconButton.module.css";

interface Props {
  disabled?: boolean;  
  children: ReactNode;
  onClick?: () => void;
}

function IconButton({ disabled, children, onClick }: Props) {
  return (
    <button disabled={disabled} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}

export default IconButton;
