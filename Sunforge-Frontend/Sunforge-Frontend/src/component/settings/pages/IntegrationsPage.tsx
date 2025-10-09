// src/component/settings/pages/IntegrationsPage.tsx
import { H1, Section, Row, Button } from "./_ui";
export default function IntegrationsPage() {
  return (
    <>
      <H1>Connections</H1>
      <Section title="Manage integrations">
        <Row title="Create API key" right={<Button>Create</Button>} />
      </Section>
    </>
  );
}
