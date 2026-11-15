import { contact, person, social } from "@/resources";

import styles from "./ContactSection.module.scss";
import { Section } from "./Section";

/** "Let's talk" strip with email, GitHub and LinkedIn. Used on home and About. */
export const ContactSection = () => {
  const links = social.filter((item) => item.name === "GitHub" || item.name === "LinkedIn");

  return (
    <Section
      id="contact"
      label={contact.label}
      title={contact.title}
      spacing="compact"
      className={styles.section}
    >
      <div className={styles.links}>
        <a href={`mailto:${person.email}`} className={styles.email}>
          {person.email}
        </a>
        {links.map((item) => (
          <a key={item.name} href={item.link} className={styles.link}>
            {item.name} →
          </a>
        ))}
      </div>
    </Section>
  );
};
