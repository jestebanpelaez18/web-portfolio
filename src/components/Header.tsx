import classNames from "classnames";
import Link from "next/link";

import { Row } from "@once-ui-system/core";

import { person, routes } from "@/resources";
import styles from "./Header.module.scss";
import { NavLink } from "./NavLink";

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
          <NavLink href="/work" className={styles.link} activeClassName={styles.active}>
            Work
          </NavLink>
        )}
        {routes["/about"] && (
          <NavLink href="/about" className={styles.link} activeClassName={styles.active}>
            About
          </NavLink>
        )}
        <Link href="/#contact" className={classNames(styles.link, styles.accent)}>
          Get in touch
        </Link>
      </Row>
    </Row>
  );
};
