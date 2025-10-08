// src/component/settings/pages/ImportPage.tsx
import { H1, Section, Row, Button } from "./_ui";
export default function ImportPage() {
  return (
    <>
      <H1>Import</H1>
      <Section title="Supported sources">
        <Row title="Markdown & CSV" right={<Button>Import</Button>} />
        <Row title="Notion export (.zip)" right={<Button>Import</Button>} />
      </Section>
    </>
  );
}
