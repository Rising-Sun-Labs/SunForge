// src/component/settings/pages/GeneralPage.tsx

import { Divider, H1, ProfileFace, Row, Section, Select, Toggle } from "./_ui";

import { FaArrowAltCircleRight } from "react-icons/fa";
import React from "react";

export default function GeneralPage({
  title = "General",
  subtitle = "",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [lang, setLang] = React.useState("English (US)");
  const [tz, setTz] = React.useState("(GMT+05:30) IST");
  const [isActive, setIsActive] = React.useState(false);

  return (
    <>
      <H1>{title}</H1>
      <Divider />
      <div className="flex items-center">
        <ProfileFace profileName="Ankush Raj" />
      </div>
      <button
        className="flex pt-2 items-center font-semibold text-xs"
        onClick={() => {}}
      >
        Create your portrait
      </button>
      <div className="pt-10">
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
                onChange={setTz}
                options={["(GMT+05:30) IST", "UTC", "PST", "CET"]}
              />
            }
          />
        </Section>
      </div>
      <div>
        <Section title="Account security">
          <Row
            title="Email"
            right={
              <button className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-900">
                Change email
              </button>
            }
            value="ankushraj886@gmail.com"
          />

          <Row
            title="Password"
            right={
              <button className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-900">
                Add password
              </button>
            }
            value="Set a permanent password to login to your account"
          />
        </Section>
      </div>
      <div>
        <Section title="Support">
          <Row
            title="Support access"
            right={<Toggle checked={isActive} onChange={setIsActive} />}
            value="Grant Sunforge support temporary access to your account so we can troubleshoot problems or recover content on your behalf. You can revoke access at any time."
          />

          <Row
            title="Delete my account"
            right={
              <FaArrowAltCircleRight
                className="rounded-lg text-[30px] bg-transparent"
                onClick={() => {}}
              />
            }
            value="Permanently delete the account and remove access from all workspaces"
          />
        </Section>
      </div>
      <div>
        <Section title="Devices">
          <Row
            title="Log out of all devices"
            right={
              <button className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-900">
                Log out of all devices
              </button>
            }
            value="Log out of all other active sessions on other devices besides this on"
          />
        </Section>
      </div>
      {subtitle && <div className="text-sm text-zinc-500">{subtitle}</div>}
    </>
  );
}
