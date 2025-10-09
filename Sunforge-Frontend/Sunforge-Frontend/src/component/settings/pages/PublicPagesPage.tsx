// src/component/settings/pages/PublicPagesPage.tsx
import React from "react";
import { H1, Section, Row, Toggle } from "./_ui";
export default function PublicPagesPage() {
  const [allow, setAllow] = React.useState(true);
  return (
    <>
      <H1>Public pages</H1>
      <Section title="Sharing">
        <Row
          title="Allow public page sharing"
          right={<Toggle checked={allow} onChange={setAllow} />}
        />
      </Section>
    </>
  );
}
