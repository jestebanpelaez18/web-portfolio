import { Column, Meta, Schema } from "@once-ui-system/core";
import Link from "next/link";

import { ContactSection, PageHero, Section, SelectedWork } from "@/components";
import styles from "@/components/home/Home.module.scss";
import { about, baseURL, home, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const { hero, aboutStrip } = home;

  return (
    <Column fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <PageHero variant="home" title={hero.title} subline={hero.subline} />

      <SelectedWork />

      <Section id="about" title={aboutStrip.title} spacing="compact">
        {aboutStrip.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
        <Link href={aboutStrip.link.href} className={styles.more}>
          {aboutStrip.link.label}
        </Link>
      </Section>

      <ContactSection />
    </Column>
  );
}
