// src/component/settings/pages/GeneralPage.tsx
import React from "react";
import { H1, Section, Row, Select, Button } from "./_ui";
export default function GeneralPage({
  title = "General",
  subtitle = "",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [lang, setLang] = React.useState("English (US)");
  const [tz, setTz] = React.useState("(GMT+05:30) IST");
  return (
    <>
      <H1>{title}</H1>
      <Section title="Preferences">
        <Row
          title="Language"
          right={
            <Select
              value={lang}
              onChange={setLang}
              options={["English (US)", "English (UK)", "Deutsch", "हिंदी"]}
            />
          }
        />
        <Row
          title="Time zone"
          right={
            <Select
              value={tz}
              onChange={setTz}
              options={["(GMT+05:30) IST", "UTC", "PST", "CET"]}
            />
          }
        />
      </Section>
      {subtitle && <div className="text-sm text-zinc-500">{subtitle}</div>}
    </>
  );
}
