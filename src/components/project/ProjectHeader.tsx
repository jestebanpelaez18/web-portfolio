import classNames from "classnames";

import { Eyebrow } from "@/components/Eyebrow";

import styles from "./Project.module.scss";

type ProjectHeaderProps = {
  label: string;
  title: string;
  headline: string;
  variant?: "case-study" | "short";
};

export const ProjectHeader = ({
  label,
  title,
  headline,
  variant = "case-study",
}: ProjectHeaderProps) => (
  <header className={classNames(styles.header, variant === "short" && styles.headerShort)}>
    <Eyebrow size="m">{label}</Eyebrow>
    <div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subline}>{headline}</p>
    </div>
  </header>
);
