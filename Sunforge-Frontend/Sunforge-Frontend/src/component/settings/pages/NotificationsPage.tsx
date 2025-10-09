// src/component/settings/pages/NotificationsPage.tsx
import React from "react";
import { H1, Section, Row, Toggle } from "./_ui";
export default function NotificationsPage() {
  const [emailAll, setEmailAll] = React.useState(true);
  const [mentions, setMentions] = React.useState(true);
  const [mobile, setMobile] = React.useState(false);
  return (
    <>
      <H1>Notifications</H1>
      <Section title="Email">
        <Row
          title="All notifications"
          right={<Toggle checked={emailAll} onChange={setEmailAll} />}
        />
        <Row
          title="Mentions"
          right={<Toggle checked={mentions} onChange={setMentions} />}
        />
      </Section>
      <Section title="Push">
        <Row
          title="Mobile push notifications"
          right={<Toggle checked={mobile} onChange={setMobile} />}
        />
      </Section>
    </>
  );
}
