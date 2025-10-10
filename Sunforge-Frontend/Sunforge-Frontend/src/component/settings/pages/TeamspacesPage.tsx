// src/component/settings/pages/TeamspacesPage.tsx

import { Button, H1, Row, Section } from "./_ui";

export default function TeamspacesPage() {
  return (
    <>
      <H1>Teamspaces</H1>
      <Section title="Manage teamspaces">
        <Row title="Engineering" right={<Button>Open</Button>} />
        <Row title="Backend" right={<Button>Open</Button>} />
        <Row title="React" right={<Button>Open</Button>} />
      </Section>
    </>
  );
}
