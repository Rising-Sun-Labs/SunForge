// src/component/settings/pages/PreferencesPage.tsx

import {
  Button,
  Divider,
  H1,
  Row,
  Section,
  Select,
  Subtle,
  Toggle,
} from "./_ui";

import React from "react";

export default function PreferencesPage() {
  const [autoTZ, setAutoTZ] = React.useState(true);
  const [tz, setTZ] = React.useState("(GMT+05:30) Calcutta");
  const [openOnStart, setOpenOnStart] = React.useState("Last visited page");
  const [viewHistory, setViewHistory] = React.useState(true);
  const [discover, setDiscover] = React.useState(true);

  const [lang, setLang] = React.useState("English (US)");
  return (
    <>
      <H1>Preferences</H1>
      <Section title="">
        <Row
          title="Appearance"
          desc={<Subtle>"Customize how Sunforge looks on your device"</Subtle>}
          right={
            <Select
              value={openOnStart}
              onChange={setOpenOnStart}
              options={[
                "Use default system setting",
                "White",
                "Dark",
                "Custom",
              ]}
            />
          }
        />
        <Row
          title="Set timezone automatically using your location"
          desc="Reminders, notifications and emails are delivered based on your time zone."
          right={<Toggle checked={autoTZ} onChange={setAutoTZ} />}
        />
        <Row
          title="Timezone"
          desc={<Subtle>Current timezone setting.</Subtle>}
          right={
            <div className="flex items-center gap-2">
              <Select
                value={tz}
                onChange={setTZ}
                options={[
                  "(GMT+05:30) Calcutta",
                  "(UTC±00:00) UTC",
                  "(GMT-08:00) Pacific Time",
                  "(GMT+01:00) Central Europe",
                ]}
              />
            </div>
          }
        />
        <Row
          title="Open on start"
          desc="Choose what to show when Notion starts or when you switch workspaces."
          right={
            <Select
              value={openOnStart}
              onChange={setOpenOnStart}
              options={["Last visited page", "Home", "Inbox"]}
            />
          }
        />
      </Section>
      <Section title="Langugage And Time">
        <Row
          title="Language"
          right={
            <Select
              value={lang}
              onChange={setLang}
              options={["English (US)", "English (UK)", "Deutsch", "हिंदी"]}
            />
          }
        />
        <Row
          title="Time zone"
          right={
            <Select
              value={tz}
              onChange={setTZ}
              options={["(GMT+05:30) IST", "UTC", "PST", "CET"]}
            />
          }
        />
      </Section>
      <Divider />

      <H1>Privacy</H1>
      <Section title="">
        <Row
          title="Cookie settings"
          desc={
            <>
              Customize cookies. See <a className="underline">Cookie Notice</a>{" "}
              for details.
            </>
          }
          right={<Button>Customize</Button>}
        />
        <Row
          title="Show my view history"
          desc="People with edit or full access will be able to see when you’ve viewed a page."
          right={<Toggle checked={viewHistory} onChange={setViewHistory} />}
        />
        <Row
          title="Profile discoverability"
          desc="Users with your email can see your name and profile picture when inviting you to a new workspace."
          right={<Toggle checked={discover} onChange={setDiscover} />}
        />
      </Section>
    </>
  );
}
