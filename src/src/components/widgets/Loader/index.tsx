import styles from "./Loader.module.scss";

function Loader({ size = 50 }: { size?: number }) {
  return (
    <div className={styles.loader} style={{ width: size, height: size }} />
  );
}

export default Loader;
