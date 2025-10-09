// src/component/settings/pages/NotionAIPage.tsx
import React from "react";
import { H1, Section, Row, Toggle } from "./_ui";
export default function NotionAIPage() {
  const [ai, setAi] = React.useState(true);
  return (
    <>
      <H1>Notion AI</H1>
      <Section title="Access">
        <Row
          title="Enable AI features"
          right={<Toggle checked={ai} onChange={setAi} />}
        />
      </Section>
    </>
  );
}
