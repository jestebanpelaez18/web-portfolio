import { Row, Text } from "@once-ui-system/core";

import { person } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row as="footer" fillWidth wrap gap="8" horizontal="between" className={styles.footer}>
      <Text>
        © {currentYear} {person.name}
      </Text>
      <Text>
        Based on{" "}
        <a
          href="https://github.com/once-ui-system/magic-portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Magic Portfolio
        </a>{" "}
        by Once UI
      </Text>
    </Row>
  );
};
