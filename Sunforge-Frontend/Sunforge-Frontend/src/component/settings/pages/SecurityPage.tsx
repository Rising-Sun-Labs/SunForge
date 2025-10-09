// src/component/settings/pages/SecurityPage.tsx
import React from "react";
import { H1, Section, Row, Toggle } from "./_ui";
export default function SecurityPage() {
  const [sso, setSso] = React.useState(false);
  const [publicLinks, setPublicLinks] = React.useState(true);
  return (
    <>
      <H1>Security</H1>
      <Section title="Workspace security">
        <Row
          title="Require SSO"
          right={<Toggle checked={sso} onChange={setSso} />}
        />
        <Row
          title="Allow public shared links"
          right={<Toggle checked={publicLinks} onChange={setPublicLinks} />}
        />
      </Section>
    </>
  );
}
