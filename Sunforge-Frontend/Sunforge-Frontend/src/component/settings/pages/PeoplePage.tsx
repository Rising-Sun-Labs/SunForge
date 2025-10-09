// src/component/settings/pages/PeoplePage.tsx
import { H1, Section, Row, Button } from "./_ui";
export default function PeoplePage() {
  return (
    <>
      <H1>People</H1>
      <Section title="Invite">
        <Row
          title="Invite by email"
          right={
            <div className="flex gap-2">
              <input
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-2 py-1 text-sm text-zinc-200"
                placeholder="name@example.com"
              />
              <Button>Send invite</Button>
            </div>
          }
        />
      </Section>
    </>
  );
}
