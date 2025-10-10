// src/component/settings/pages/NotificationsPage.tsx

import { Row, Section, Select, Subtle, Toggle } from "./_ui";

import React from "react";

export default function NotificationsPage() {
  const [mentions, setMentions] = React.useState(true);
  const [mobile, setMobile] = React.useState(false);
  const [discordNotifications, setDiscordNotifications] = React.useState("Off");

  // Rendered labels for the select
  const discordOptions: string[] = ["Off", "+ Add new account"];

  // Handler when user picks "+ Add new account"
  const handleAddDiscordAccount = React.useCallback(() => {
    // TODO: open your modal / OAuth flow
    // after success, you might set the selected value to the new account name
    console.log("Add new Discord account flow…");
  }, []);

  const handleDiscordChange = (v: string) => {
    if (v === "+ Add new account") {
      handleAddDiscordAccount();
      return; // keep previous value selected
    }
    setDiscordNotifications(v);
  };

  return (
    <>
      <Section title="Discord notifications">
        <Row
          title="Discord notifications"
          desc={
            <Subtle>
              {
                "Receive notifications in Discord when you're mentioned anywhere"
              }
            </Subtle>
          }
          right={
            // <div className="rounded-lg border-non bg-zinc-900/40 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-900">
            <Select
              value={discordNotifications}
              onChange={handleDiscordChange}
              options={discordOptions}
            />
            // </div>
          }
        />
      </Section>

      <Section title="Email notifications">
        <Row
          title="Mobile push notifications"
          right={<Toggle checked={mobile} onChange={setMobile} />}
          value="Allow Sunforge to send notifications on mobile"
        />
        <Row
          title="Mentions"
          right={<Toggle checked={mentions} onChange={setMentions} />}
        />
        <Row
          title="Workspace Notification"
          right={<Toggle checked={mobile} onChange={setMobile} />}
          value="Get notifications when someone do some activity in your workspace"
        />
        <Row
          title="Page updates"
          right={<Toggle checked={mobile} onChange={setMobile} />}
          value="Receive email digests for changes to pages you're subscribed to"
        />
      </Section>
    </>
  );
}
