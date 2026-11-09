import classNames from "classnames";

import { Text } from "@once-ui-system/core";

import styles from "./Eyebrow.module.scss";

type EyebrowProps = {
  children: React.ReactNode;
  /** "s" is 13px (cards, meta rows), "m" is 14px (section labels). */
  size?: "s" | "m";
  className?: string;
};

/** Small uppercase label in the muted colour. */
export const Eyebrow = ({ children, size = "s", className }: EyebrowProps) => (
  <Text as="span" className={classNames(styles.eyebrow, styles[size], className)}>
    {children}
  </Text>
);
