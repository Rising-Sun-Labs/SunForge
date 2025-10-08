// src/component/settings/pages/ConnectionsPage.tsx
import { H1, Section, Row, Button } from "./_ui";
export default function ConnectionsPage() {
  return (
    <>
      <H1>Connections</H1>
      <Section title="Connected apps">
        <Row title="GitHub" right={<Button>Connect</Button>} />
        <Row title="Google Drive" right={<Button>Connect</Button>} />
      </Section>
    </>
  );
}
