import classNames from "classnames";
import Image from "next/image";

import type { MediaFit } from "@/types";
import { publicFileExists, showMedia } from "@/utils/projects";

import styles from "./ProjectMedia.module.scss";

type ProjectMediaProps = {
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "16 / 9". */
  ratio: string;
  /** Background behind the image and colour of the placeholder. */
  tone?: "panel" | "dark" | "white";
  /** next/image sizes hint. */
  sizes?: string;
  /** "contain" shows the whole image (diagrams); default crops to fill. */
  fit?: MediaFit;
  priority?: boolean;
  className?: string;
};

/**
 * Project image, GIF or looping video. Until the file exists in public/,
 * renders a box in the tone colour with the alt text, so layouts can be
 * checked without the real media. In production a missing file renders
 * nothing; parents check `showMedia` first so their layout closes the gap.
 */
export const ProjectMedia = ({
  src,
  alt,
  ratio,
  tone = "panel",
  sizes = "100vw",
  fit = "cover",
  priority = false,
  className,
}: ProjectMediaProps) => {
  if (!showMedia(src)) return null;
  const exists = publicFileExists(src);
  const isVideo = /\.(mp4|webm)$/i.test(src);
  const fillClass = classNames(styles.fill, fit === "contain" && styles.contain);

  return (
    <div
      className={classNames(styles.media, styles[tone], className)}
      style={{ aspectRatio: ratio }}
    >
      {!exists ? (
        <span className={styles.placeholder}>{alt}</span>
      ) : isVideo ? (
        <video className={fillClass} src={src} aria-label={alt} autoPlay muted loop playsInline />
      ) : (
        <Image
          className={fillClass}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={/\.gif$/i.test(src)}
        />
      )}
    </div>
  );
};
