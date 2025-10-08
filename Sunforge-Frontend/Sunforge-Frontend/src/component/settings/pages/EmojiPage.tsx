// src/component/settings/pages/EmojiPage.tsx
import { H1, Section, Row, Button } from "./_ui";
export default function EmojiPage() {
  return (
    <>
      <H1>Emoji</H1>
      <Section title="Custom emoji">
        <Row title="Upload custom emoji" right={<Button>Upload</Button>} />
      </Section>
    </>
  );
}
