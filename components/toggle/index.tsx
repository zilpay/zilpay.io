import styles from "./index.module.scss";

import React from "react";
import classNames from "classnames";

type Prop = {
  value: boolean;
  onToggle: (value: boolean) => void;
};

export const Toggle: React.FC<Prop> = ({
  value,
  onToggle
}) => {
  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        name="darkMode"
        onInput={() => onToggle(!value)}
      />
      <span className={classNames(styles.iconwrapper, {
        selected: value
      })}>
        <span className={classNames(styles.toogledot, {
          selected: value
        })}/>
        {!value ? (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M5.993 0a.428.428 0 0 0-.421.434v1.284a.428.428 0 1 0 .856 0V.434A.428.428 0 0 0 5.993 0zM2.06 1.632a.428.428 0 0 0-.298.735l.908.909a.428.428 0 1 0 .606-.606l-.908-.908a.428.428 0 0 0-.308-.13zm7.867 0a.428.428 0 0 0-.295.13l-.908.908a.428.428 0 1 0 .606.606l.908-.909a.429.429 0 0 0-.311-.735zM6 3.002a2.997 2.997 0 1 0 0 5.995 2.997 2.997 0 0 0 0-5.994zM.434 5.573a.428.428 0 1 0 0 .856H1.72a.428.428 0 1 0 0-.856H.434zm9.847 0a.428.428 0 1 0 0 .856h1.285a.428.428 0 1 0 0-.856H10.28zM2.965 8.595a.428.428 0 0 0-.295.13l-.908.907a.428.428 0 1 0 .606.606l.908-.908a.428.428 0 0 0-.311-.735zm6.058 0a.428.428 0 0 0-.299.735l.908.908a.428.428 0 1 0 .606-.606l-.908-.908a.428.428 0 0 0-.307-.13zm-3.03 1.252a.428.428 0 0 0-.421.434v1.285a.428.428 0 1 0 .856 0V10.28a.429.429 0 0 0-.435-.434z"
              fill="var(--button-color)"
            />
          </svg>
        ) : (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M8.049 4.291l-1.043.22.714.792-.113 1.06.974-.435.973.435-.113-1.06.714-.792-1.043-.22-.531-.924-.532.924zM11.209 8.59l-.684-.145-.348-.605-.348.605-.683.144.468.519-.074.694.637-.285.638.285-.074-.694.468-.519z" fill="#fff"></path><path d="M5.354 6A6 6 0 0 1 8.677.63a6 6 0 1 0 0 10.741A6 6 0 0 1 5.354 6z"
              fill="var(--button-color)"
            />
          </svg>
        )}
      </span>
    </label>
  );
};
