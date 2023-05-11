function PauseIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32.5" cy="32.5" r="32.5" fill="var(--slider-track-colour)" />
      <rect
        x="22"
        y="20"
        width="8"
        height="25"
        fill="var(--background-colour)"
      />
      <rect
        x="36"
        y="20"
        width="8"
        height="25"
        fill="var(--background-colour)"
      />
    </svg>
  );
}

export default PauseIcon;
