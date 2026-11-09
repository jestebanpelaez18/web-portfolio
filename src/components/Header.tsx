import Link from "next/link";
import classNames from "classnames";

import { Row } from "@once-ui-system/core";

import { person, routes } from "@/resources";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <Row
      as="header"
      fillWidth
      wrap
      gap="16"
      horizontal="between"
      vertical="center"
      className={styles.header}
    >
      <Link href="/" className={classNames(styles.link, styles.name)}>
        {person.name}
      </Link>
      <Row as="nav" aria-label="Main" wrap vertical="center" className={styles.nav}>
        {routes["/work"] && (
          <Link href="/work" className={styles.link}>
            Work
          </Link>
        )}
        {routes["/about"] && (
          <Link href="/about" className={styles.link}>
            About
          </Link>
        )}
        <Link href="/#contact" className={classNames(styles.link, styles.accent)}>
          Get in touch
        </Link>
      </Row>
    </Row>
  );
};
