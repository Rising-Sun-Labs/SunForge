// src/component/settings/pages/PreferencesPage.tsx
import React from "react";
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

export default function PreferencesPage() {
  const [autoTZ, setAutoTZ] = React.useState(true);
  const [tz, setTZ] = React.useState("(GMT+05:30) Calcutta");
  const [desktopOpen, setDesktopOpen] = React.useState(false);
  const [openOnStart, setOpenOnStart] = React.useState("Last visited page");
  const [viewHistory, setViewHistory] = React.useState(true);
  const [discover, setDiscover] = React.useState(true);

  return (
    <>
      <H1>Preferences</H1>

      <Section title="">
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
      </Section>

      <Divider />

      <H1>Desktop app</H1>
      <Section title="">
        <Row
          title="Open links in desktop app"
          desc={
            <>
              You must have the macOS app installed.
              <br />
              If installed, macOS will open links to Notion in the desktop app,
              even if this setting is turned off.
              <br />
              To disable that behavior, enable “Open Notion links in browser” in
              your app.
            </>
          }
          right={<Toggle checked={desktopOpen} onChange={setDesktopOpen} />}
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
        <div className="mt-2 flex justify-end">
          <Button>Set in app</Button>
        </div>
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
