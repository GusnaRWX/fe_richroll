import clsx from "clsx";
import styles from "./styles.module.scss";

export default function Button({ info, variant }: any) {
  return (
    <main>
      <button className={clsx(styles.default)}>{info}</button>
    </main>
  );
}
