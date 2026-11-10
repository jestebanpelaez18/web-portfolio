import classNames from "classnames";
import { Fragment } from "react";

import type { Diagram as DiagramData, DiagramStep } from "@/types";

import styles from "./Diagram.module.scss";

type DiagramProps = {
  diagram: DiagramData;
  /** Shown as the caps label when the diagram has none (e.g. the section title). */
  fallbackLabel?: string;
  /** Render the label as a heading when the diagram stands in for a section. */
  labelAs?: "span" | "h2";
};

const Step = ({ step }: { step: DiagramStep }) =>
  step.stack ? (
    <div className={styles.stack}>
      {step.stack.map((child, i) => (
        <Step key={`${child.title}-${i}`} step={child} />
      ))}
    </div>
  ) : (
    <div className={classNames(styles.step, step.dark && styles.dark)}>
      {step.label && <span className={styles.stepLabel}>{step.label}</span>}
      {step.title && <span className={styles.stepTitle}>{step.title}</span>}
      {step.text && <span className={styles.stepText}>{step.text}</span>}
    </div>
  );

/**
 * A row of steps joined by arrows, on the project's panel colour.
 * Wraps on narrow screens through flex-wrap, without media queries.
 */
export const Diagram = ({ diagram, fallbackLabel, labelAs = "span" }: DiagramProps) => {
  const label = diagram.label ?? fallbackLabel;
  const Label = labelAs;

  return (
    <figure className={styles.diagram}>
      {label && <Label className={styles.label}>{label}</Label>}
      <div className={styles.steps}>
        {diagram.steps.map((step, i) => (
          <Fragment key={`${step.title}-${i}`}>
            {i > 0 && (
              <span aria-hidden="true" className={styles.arrow}>
                →
              </span>
            )}
            <Step step={step} />
          </Fragment>
        ))}
      </div>
      {diagram.footnote && <figcaption className={styles.footnote}>{diagram.footnote}</figcaption>}
    </figure>
  );
};
