import { Column, Meta, Schema } from "@once-ui-system/core";
import Link from "next/link";

import { ContactSection, Eyebrow, PageHero, ProjectMedia, Section } from "@/components";
import styles from "@/components/about/About.module.scss";
import { about, baseURL, person } from "@/resources";
import { publicFileExists } from "@/utils/projects";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const { header, intro, experience, education, skills, certifications, languages, outsideWork } =
    about;
  const hasCV = publicFileExists(intro.cv.href);

  return (
    <Column fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <PageHero title={header.title} subline={header.subline} />

      <Section
        gap="wide"
        aside={
          <div className={styles.aside}>
            <ProjectMedia
              src={intro.photo.src}
              alt={intro.photo.alt}
              ratio="4 / 5"
              sizes="(max-width: 700px) 100vw, 420px"
              priority
            />
            <dl className={styles.facts}>
              {intro.facts.map((fact) => (
                <div key={fact.label} className={styles.fact}>
                  <dt>
                    <Eyebrow>{fact.label}</Eyebrow>
                  </dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            {hasCV && (
              <a href={intro.cv.href} className={styles.cv} download>
                {intro.cv.label}
              </a>
            )}
          </div>
        }
      >
        <div className={styles.lead}>
          {intro.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section title={experience.title}>
        {experience.items.map((job) => (
          <div key={job.company} className={styles.entry}>
            <div className={styles.entryHead}>
              <h3 className={styles.entryTitle}>{job.company}</h3>
              <span className={styles.period}>{job.period}</span>
            </div>
            <span className={styles.role}>{job.role}</span>
            <ul className={styles.bullets}>
              {job.bullets.map((bullet) => (
                <li key={bullet.slice(0, 24)}>
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>{" "}
                  {bullet}
                </li>
              ))}
            </ul>
            {job.link && (
              <Link href={job.link.href} className={styles.textLink}>
                {job.link.label}
              </Link>
            )}
          </div>
        ))}
      </Section>

      <Section title={education.title}>
        <div className={styles.education}>
          {education.items.map((item) => (
            <div key={item.school} className={styles.entry}>
              <div className={styles.entryHead}>
                <h3 className={styles.entryTitle}>{item.school}</h3>
                <span className={styles.period}>{item.period}</span>
              </div>
              <span className={styles.role}>{item.programme}</span>
              <p className={styles.secondary}>{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={skills.title}>
        <div className={styles.skills}>
          {skills.groups.map((group) => (
            <div key={group.label} className={styles.skill}>
              <h3 className={styles.skillLabel}>{group.label}</h3>
              <p>{group.items}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={certifications.title}>
        <ul className={styles.certifications}>
          {certifications.items.map((item) => (
            <li key={item.name}>
              <span>{item.name}</span>
              <span className={styles.muted}>
                {item.issuer} · {item.date}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={languages.title}>
        <div className={styles.languages}>
          {languages.items.map((item) => (
            <div key={item.name} className={styles.language}>
              <span className={styles.languageName}>{item.name}</span>
              <span className={styles.muted}>{item.level}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title={outsideWork.title}>
        <p className={styles.leadText}>{outsideWork.text}</p>
      </Section>

      <ContactSection />
    </Column>
  );
}
