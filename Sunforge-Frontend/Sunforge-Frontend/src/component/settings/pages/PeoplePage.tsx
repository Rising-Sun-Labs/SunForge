// src/component/settings/pages/PeoplePage.tsx
import React from "react";
import {
  H1,
  Section,
  Row,
  Button,
  type TabItem,
  Toggle,
  TabBar,
  SearchField,
  GuestsEmptyState,
  MemberList,
  GroupsEmpty,
  ContactsEmpty,
} from "./_ui";
export default function PeoplePage() {
  // invite link
  const [inviteLinkOn, setInviteLinkOn] = React.useState(true);

  // tabs
  const tabs: TabItem[] = [
    { key: "guests", label: "Guests" },
    { key: "members", label: "Members", count: 1 },
    { key: "groups", label: "Groups" },
    { key: "contacts", label: "Contacts" },
  ];

  const [activeTab, setActiveTab] = React.useState<string>("guests");

  // Search + Add members
  const [query, setQuery] = React.useState("");

  return (
    <>
      <H1>People</H1>
      <Section title="">
        <div className="px-3 py-3">
          <div className="mb-3 text-[15px] font-semibold text-zinc-200">
            Invite link to add members
          </div>
          <div className="mb-4 text-[12px] text-zinc-500">
            Only people with permissin to invite members can see this. You can
            also{" "}
            <a className="text-sky-400 hover:underline" href="#">
              generate a new link
            </a>
          </div>
          <div className="flex items-center justify-between">
            <div />
            <div className="flex items-center gap-2">
              <button className="rounded-lg bg-indigo-600/90 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-600">
                Copy link
              </button>
              <Toggle
                checked={inviteLinkOn}
                onChange={setInviteLinkOn}
              ></Toggle>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <TabBar items={tabs} active={activeTab} onChange={setActiveTab} />

        {/* Toolbar: search + add members */}
        <div className="flex items-center justify-end gap-2 px-3 py-3">
          <SearchField value={query} onChange={setQuery} placeholder="Search" />
          <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-900 bg-zinc-900/40 px-3 py-1.5 text-sm font-semibold text-zinc-400 hover:text-zinc-500">
            Add members
            <svg
              viewBox="0 0 20 20"
              className="h-4 w- text-zinc-300"
              fill="currentColor"
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />{" "}
            </svg>
          </button>
        </div>

        {/* Content area */}
        <div className="px-3 pb-4">
          {activeTab === "guests " && <GuestsEmptyState />}
          {activeTab === "members" && <MemberList />}
          {activeTab === "groups" && <GroupsEmpty />}
          {activeTab === "contacts" && <ContactsEmpty />}
        </div>
      </Section>
    </>
  );
}
