import styles from "./PageHero.module.scss";

type PageHeroProps = {
  title: string;
  subline: string;
  /** "home" uses the larger home subline, "page" the About one. */
  variant?: "home" | "page";
};

/** Page h1 with a large serif subline in muted grey (home and About). */
export const PageHero = ({ title, subline, variant = "page" }: PageHeroProps) => (
  <header className={variant === "home" ? styles.home : styles.page}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.subline}>{subline}</p>
  </header>
);
