// src/component/settings/pages/IdentityPage.tsx
import React from "react";
import { H1, Section, Row, Button } from "./_ui";
export default function IdentityPage() {
  return (
    <>
      <H1>Identity</H1>
      <Section title="Domain">
        <Row
          title="Workspace domain"
          right={
            <div className="flex items-center gap-2">
              <input
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-2 py-1 text-sm text-zinc-200"
                defaultValue="sunforge.example"
              />
              <Button>Save</Button>
            </div>
          }
        />
      </Section>
    </>
  );
}
