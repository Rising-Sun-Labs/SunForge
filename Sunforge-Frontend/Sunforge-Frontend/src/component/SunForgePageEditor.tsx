// // import React from "react";
// // import { cx } from "@emotion/css";
// // import {
// //   FaPlus,
// //   FaHeading,
// //   FaListUl,
// //   FaListOl,
// //   FaCheckSquare,
// //   FaChevronDown,
// //   FaChevronRight,
// //   FaQuoteLeft,
// //   FaMinus,
// //   FaExternalLinkAlt,
// //   FaImage,
// //   FaVideo,
// //   FaMusic,
// //   FaCode,
// //   FaFile,
// //   FaLink,
// //   FaDatabase,
// //   FaRegSmile,
// //   FaCalendar,
// //   FaMapMarkedAlt,
// //   FaChartBar,
// //   FaChartLine,
// //   FaChartPie,
// //   FaColumns,
// //   FaPen,
// //   FaRobot,
// //   FaTasks,
// //   FaUser,
// //   FaStickyNote,
// //   FaCopy,
// //   FaBold,
// //   FaItalic,
// //   FaUnderline,
// //   FaHighlighter,
// //   FaAlignLeft,
// //   FaAlignCenter,
// //   FaAlignRight,
// //   FaAlignJustify,
// //   FaClock,
// //   FaUserCircle,
// //   FaBook,
// // } from "react-icons/fa";
// // import { MdToggleOn, MdOutlineTableChart } from "react-icons/md";
// // import {
// //   SiGooglemaps,
// //   SiGithub,
// //   SiLoom,
// //   SiSlack,
// //   SiJira,
// //   SiDropbox,
// //   //   SiMicrosoftonedrive,
// //   //   SiLucidchart,
// //   SiMiro,
// //   //   SiWhitesource,
// // } from "react-icons/si";
// // import { PiFlowArrowBold } from "react-icons/pi";
// // import { SiMendeley } from "react-icons/si";
// // import { SiGoogledrive } from "react-icons/si";
// // import { DiOnedrive } from "react-icons/di";
// // import { SiExcalidraw } from "react-icons/si";
// // import { SiSketchup } from "react-icons/si";
// // import { SiAdobexd } from "react-icons/si";
// // import { FaProjectDiagram } from "react-icons/fa";

// // const uuid = () =>
// //   globalThis.crypto?.randomUUID?.() ??
// //   `${Math.random().toString(36).slice(2)}-${Date.now()}`;
// // type BlockType =
// //   | "text"
// //   | "heading1"
// //   | "heading2"
// //   | "heading3"
// //   | "bulleted"
// //   | "numbered"
// //   | "todo"
// //   | "toggle"
// //   | "divider"
// //   | "quote"
// //   | "callout"
// //   | "image"
// //   | "video"
// //   | "audio"
// //   | "code"
// //   | "file"
// //   | "link"
// //   | "table"
// //   | "database"
// //   | "tableofcontents"
// //   | "equation"
// //   | "breadcrumbs"
// //   | "button"
// //   | "synced"
// //   | "columns2"
// //   | "columns3"
// //   | "columns4"
// //   | "columns5"
// //   | "mermaid"
// //   | "page"
// //   | "ai"
// //   | "embed"
// //   | "mention"
// //   | "date"
// //   | "emoji"
// //   | "inline-equation";
// // type Block = {
// //   id: string;
// //   type: BlockType;
// //   text?: string;
// //   props?: Record<string, any>;
// //   children?: Block[];
// //   collapsed?: boolean;
// // };
// // type PageMeta = {
// //   id: string;
// //   icon?: string;
// //   cover?: string;
// //   title: string;
// //   createdAt: string;
// //   updatedAt: string;
// //   createdBy: string;
// //   updatedBy: string;
// //   properties?: Record<string, any>;
// //   permissions?: {
// //     visibility: "private" | "workspace" | "public";
// //     editors?: string[];
// //   };
// //   parent?: { type: "page" | "database" | "root"; id?: string };
// // };

// // function InlineToolbar() {
// //   return (
// //     <div className="flex items-center gap-1 rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)] px-2 py-1 text-sm text-zinc-200 shadow">
// //       <button className="p-1 rounded hover:bg-[var(--sf-hover)]" title="Bold">
// //         <FaBold />
// //       </button>
// //       <button className="p-1 rounded hover:bg-[var(--sf-hover)]" title="Italic">
// //         <FaItalic />
// //       </button>
// //       <button
// //         className="p-1 rounded hover:bg-[var(--sf-hover)]"
// //         title="Underline"
// //       >
// //         <FaUnderline />
// //       </button>
// //       <button
// //         className="p-1 rounded hover:bg-[var(--sf-hover)]"
// //         title="Highlight"
// //       >
// //         <FaHighlighter />
// //       </button>
// //       <div className="mx-1 h-4 w-px bg-[var(--sf-border)]" />
// //       <button
// //         className="p-1 rounded hover:bg-[var(--sf-hover)]"
// //         title="Align left"
// //       >
// //         <FaAlignLeft />
// //       </button>
// //       <button
// //         className="p-1 rounded hover:bg-[var(--sf-hover)]"
// //         title="Align center"
// //       >
// //         <FaAlignCenter />
// //       </button>
// //       <button
// //         className="p-1 rounded hover:bg-[var(--sf-hover)]"
// //         title="Align right"
// //       >
// //         <FaAlignRight />
// //       </button>
// //       <button
// //         className="p-1 rounded hover:bg-[var(--sf-hover)]"
// //         title="Justify"
// //       >
// //         <FaAlignJustify />
// //       </button>
// //     </div>
// //   );
// // }

// // function SlashMenu({
// //   x,
// //   y,
// //   onClose,
// //   onInsert,
// // }: {
// //   x: number;
// //   y: number;
// //   onClose: () => void;
// //   onInsert: (t: BlockType) => void;
// // }) {
// //   const make = (t: BlockType) => () => {
// //     onInsert(t);
// //     onClose();
// //   };
// //   const Section = ({
// //     title,
// //     children,
// //   }: {
// //     title: string;
// //     children: React.ReactNode;
// //   }) => (
// //     <div className="mb-2">
// //       <div className="px-2 py-1 text-[11px] uppercase tracking-wide text-zinc-500">
// //         {title}
// //       </div>
// //       <div className="grid grid-cols-2 gap-1">{children}</div>
// //     </div>
// //   );
// //   const Item = ({
// //     icon,
// //     label,
// //     action,
// //   }: {
// //     icon: React.ReactNode;
// //     label: string;
// //     action: () => void;
// //   }) => (
// //     <button
// //       className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-[var(--sf-hover)]"
// //       onClick={action}
// //     >
// //       <span className="opacity-90">{icon}</span>
// //       <span className="truncate">{label}</span>
// //     </button>
// //   );
// //   return (
// //     <div
// //       className="fixed z-50 w-[520px] max-h-[420px] overflow-y-auto rounded-2xl border border-[var(--sf-border)] bg-[var(--sf-panel)] p-2 shadow-2xl"
// //       style={{ left: x, top: y }}
// //       onClick={(e) => e.stopPropagation()}
// //       onContextMenu={(e) => e.preventDefault()}
// //     >
// //       <Section title="Suggested">
// //         <Item icon={<FaRobot />} label="AI Meeting Notes" action={make("ai")} />
// //         <Item icon={<FaRobot />} label="AI Block" action={make("ai")} />
// //       </Section>
// //       <Section title="Basic blocks">
// //         <Item icon={<FaPen />} label="Text" action={make("text")} />
// //         <Item
// //           icon={<FaHeading />}
// //           label="Heading 1"
// //           action={make("heading1")}
// //         />
// //         <Item
// //           icon={<FaHeading />}
// //           label="Heading 2"
// //           action={make("heading2")}
// //         />
// //         <Item
// //           icon={<FaHeading />}
// //           label="Heading 3"
// //           action={make("heading3")}
// //         />
// //         <Item
// //           icon={<FaListUl />}
// //           label="Bulleted list"
// //           action={make("bulleted")}
// //         />
// //         <Item
// //           icon={<FaListOl />}
// //           label="Numbered list"
// //           action={make("numbered")}
// //         />
// //         <Item
// //           icon={<FaCheckSquare />}
// //           label="To-do list"
// //           action={make("todo")}
// //         />
// //         <Item
// //           icon={<MdToggleOn />}
// //           label="Toggle list"
// //           action={make("toggle")}
// //         />
// //         <Item icon={<FaBook />} label="Page" action={make("page")} />
// //         <Item
// //           icon={<FaStickyNote />}
// //           label="Callout"
// //           action={make("callout")}
// //         />
// //         <Item icon={<FaQuoteLeft />} label="Quote" action={make("quote")} />
// //         <Item
// //           icon={<MdOutlineTableChart />}
// //           label="Table"
// //           action={make("table")}
// //         />
// //         <Item icon={<FaMinus />} label="Divider" action={make("divider")} />
// //         <Item icon={<FaLink />} label="Link to page" action={make("link")} />
// //       </Section>
// //       <Section title="Sunforge AI">
// //         <Item icon={<FaRobot />} label="Continue writing" action={make("ai")} />
// //         <Item icon={<FaRobot />} label="Ask a question" action={make("ai")} />
// //         <Item
// //           icon={<FaRobot />}
// //           label="Ask about this page"
// //           action={make("ai")}
// //         />
// //         <Item icon={<FaTasks />} label="Add a summary" action={make("ai")} />
// //         <Item icon={<FaTasks />} label="Add action items" action={make("ai")} />
// //         <Item icon={<FaRobot />} label="More…" action={make("ai")} />
// //         <Item
// //           icon={<MdOutlineTableChart />}
// //           label="Make a Table"
// //           action={make("table")}
// //         />
// //         <Item
// //           icon={<PiFlowArrowBold />}
// //           label="Make a flowchart"
// //           action={make("mermaid")}
// //         />
// //         <Item icon={<FaRobot />} label="Brainstorm ideas" action={make("ai")} />
// //         <Item
// //           icon={<FaCode />}
// //           label="Get help with code"
// //           action={make("code")}
// //         />
// //         <Item icon={<FaCopy />} label="Draft an outline" action={make("ai")} />
// //         <Item icon={<FaCopy />} label="Draft an email" action={make("ai")} />
// //         <Item icon={<FaCopy />} label="Draft a PR" action={make("ai")} />
// //         <Item
// //           icon={<FaCopy />}
// //           label="Draft a meeting agenda"
// //           action={make("ai")}
// //         />
// //         <Item icon={<FaCopy />} label="Draft anything" action={make("ai")} />
// //       </Section>
// //       <Section title="Media">
// //         <Item icon={<FaImage />} label="Image" action={make("image")} />
// //         <Item icon={<FaVideo />} label="Video" action={make("video")} />
// //         <Item icon={<FaMusic />} label="Audio" action={make("audio")} />
// //         <Item icon={<FaCode />} label="Code" action={make("code")} />
// //         <Item icon={<FaFile />} label="File" action={make("file")} />
// //         <Item
// //           icon={<FaExternalLinkAlt />}
// //           label="Web bookmark"
// //           action={make("embed")}
// //         />
// //       </Section>
// //       <Section title="Database">
// //         <Item
// //           icon={<MdOutlineTableChart />}
// //           label="Table view"
// //           action={make("database")}
// //         />
// //         <Item
// //           icon={<FaColumns />}
// //           label="Board view"
// //           action={make("database")}
// //         />
// //         <Item
// //           icon={<FaImage />}
// //           label="Gallery view"
// //           action={make("database")}
// //         />
// //         <Item icon={<FaListUl />} label="List view" action={make("database")} />
// //         <Item icon={<FaListUl />} label="Feed view" action={make("database")} />
// //         <Item
// //           icon={<FaCalendar />}
// //           label="Calendar view"
// //           action={make("database")}
// //         />
// //         <Item
// //           icon={<FaClock />}
// //           label="Timeline view"
// //           action={make("database")}
// //         />
// //         <Item
// //           icon={<FaMapMarkedAlt />}
// //           label="Map view"
// //           action={make("database")}
// //         />
// //         <Item
// //           icon={<FaChartBar />}
// //           label="Vertical bar chart"
// //           action={make("database")}
// //         />
// //         <Item
// //           icon={<FaChartBar />}
// //           label="Horizontal bar chart"
// //           action={make("database")}
// //         />
// //         <Item
// //           icon={<FaChartLine />}
// //           label="Line chart"
// //           action={make("database")}
// //         />
// //         <Item
// //           icon={<FaChartPie />}
// //           label="Donut chart"
// //           action={make("database")}
// //         />
// //         <Item icon={<FaTasks />} label="Form" action={make("database")} />
// //         <Item
// //           icon={<FaDatabase />}
// //           label="Database - inline"
// //           action={make("database")}
// //         />
// //         <Item
// //           icon={<FaDatabase />}
// //           label="Database - full page"
// //           action={make("database")}
// //         />
// //         <Item
// //           icon={<FaLink />}
// //           label="Linked view of data source"
// //           action={make("database")}
// //         />
// //       </Section>
// //       <Section title="Advanced blocks">
// //         <Item
// //           icon={<FaListOl />}
// //           label="Table of contents"
// //           action={make("tableofcontents")}
// //         />
// //         <Item
// //           icon={<FaCode />}
// //           label="Block equation"
// //           action={make("equation")}
// //         />
// //         <Item icon={<FaTasks />} label="Button" action={make("button")} />
// //         <Item
// //           icon={<FaLink />}
// //           label="Breadcrumbs"
// //           action={make("breadcrumbs")}
// //         />
// //         <Item icon={<FaLink />} label="Synced block" action={make("synced")} />
// //         <Item
// //           icon={<FaHeading />}
// //           label="Toggle heading 1"
// //           action={make("toggle")}
// //         />
// //         <Item
// //           icon={<FaHeading />}
// //           label="Toggle heading 2"
// //           action={make("toggle")}
// //         />
// //         <Item
// //           icon={<FaHeading />}
// //           label="Toggle heading 3"
// //           action={make("toggle")}
// //         />
// //         <Item
// //           icon={<FaColumns />}
// //           label="2 Columns"
// //           action={make("columns2")}
// //         />
// //         <Item
// //           icon={<FaColumns />}
// //           label="3 Columns"
// //           action={make("columns3")}
// //         />
// //         <Item
// //           icon={<FaColumns />}
// //           label="4 Columns"
// //           action={make("columns4")}
// //         />
// //         <Item
// //           icon={<FaColumns />}
// //           label="5 Columns"
// //           action={make("columns5")}
// //         />
// //         <Item icon={<FaCode />} label="Code-Mermaid" action={make("mermaid")} />
// //         <Item icon={<FaRobot />} label="AI Block" action={make("ai")} />
// //       </Section>
// //       <Section title="Inline">
// //         <Item
// //           icon={<FaUser />}
// //           label="Mention a person"
// //           action={make("mention")}
// //         />
// //         <Item
// //           icon={<FaLink />}
// //           label="Mention a page or data source"
// //           action={make("mention")}
// //         />
// //         <Item
// //           icon={<FaCalendar />}
// //           label="Date or reminder"
// //           action={make("date")}
// //         />
// //         <Item icon={<FaRegSmile />} label="Emoji" action={make("emoji")} />
// //         <Item
// //           icon={<FaCode />}
// //           label="Inline equation"
// //           action={make("inline-equation")}
// //         />
// //       </Section>
// //       <Section title="Embeds">
// //         <Item
// //           icon={<FaExternalLinkAlt />}
// //           label="Embed"
// //           action={make("embed")}
// //         />
// //         <Item
// //           icon={<SiGoogledrive />}
// //           label="Google Drive"
// //           action={make("embed")}
// //         />
// //         <Item icon={<SiGithub />} label="Github Gist" action={make("embed")} />
// //         <Item
// //           icon={<SiGooglemaps />}
// //           label="Google Map"
// //           action={make("embed")}
// //         />
// //         <Item icon={<FaChartBar />} label="Sigma" action={make("embed")} />
// //         <Item icon={<SiMendeley />} label="Whimsical" action={make("embed")} />
// //         <Item icon={<SiMiro />} label="Miro" action={make("embed")} />
// //         <Item icon={<SiSketchup />} label="Sketch" action={make("embed")} />
// //         <Item
// //           icon={<SiExcalidraw />}
// //           label="Excalidraw"
// //           action={make("embed")}
// //         />
// //         <Item icon={<FaFile />} label="PDF" action={make("embed")} />
// //         <Item icon={<FaFile />} label="Words" action={make("embed")} />
// //         <Item icon={<SiLoom />} label="Loom" action={make("embed")} />
// //         <Item icon={<FaTasks />} label="Typeform" action={make("embed")} />
// //         <Item icon={<FaCode />} label="CodePen" action={make("embed")} />
// //         <Item icon={<SiJira />} label="Jira" action={make("embed")} />
// //         <Item icon={<SiSlack />} label="Slack" action={make("embed")} />
// //         <Item icon={<SiDropbox />} label="Dropbox" action={make("embed")} />
// //         <Item icon={<DiOnedrive />} label="OneDrive" action={make("embed")} />
// //         <Item
// //           icon={<FaProjectDiagram />}
// //           label="Lucidchart"
// //           action={make("embed")}
// //         />
// //         <Item icon={<SiMendeley />} label="Eraser" action={make("embed")} />
// //         <Item icon={<SiMendeley />} label="Plus" action={make("embed")} />
// //         <Item icon={<SiAdobexd />} label="Adobe XD" action={make("embed")} />
// //         <Item icon={<FaTasks />} label="Shortcut" action={make("embed")} />
// //         <Item
// //           icon={<FaExternalLinkAlt />}
// //           label="SendOwl"
// //           action={make("embed")}
// //         />
// //         <Item
// //           icon={<FaExternalLinkAlt />}
// //           label="Zendesk"
// //           action={make("embed")}
// //         />
// //         <Item
// //           icon={<FaExternalLinkAlt />}
// //           label="Discord"
// //           action={make("embed")}
// //         />
// //         <Item
// //           icon={<FaUserCircle />}
// //           label="Google Contacts"
// //           action={make("embed")}
// //         />
// //       </Section>
// //       <Section title="Import">
// //         <Item icon={<FaFile />} label="CSV" action={make("file")} />
// //         <Item icon={<FaFile />} label="HTML" action={make("file")} />
// //         <Item icon={<FaFile />} label="JSON" action={make("file")} />
// //         <Item icon={<FaFile />} label="Text & Markdown" action={make("file")} />
// //         <Item
// //           icon={<SiDropbox />}
// //           label="Dropbox Paper"
// //           action={make("file")}
// //         />
// //         <Item
// //           icon={<FaExternalLinkAlt />}
// //           label="Trello"
// //           action={make("file")}
// //         />
// //         <Item icon={<FaFile />} label="Word" action={make("file")} />
// //         <Item icon={<FaFile />} label="Zip" action={make("file")} />
// //         <Item icon={<FaFile />} label="PDF" action={make("file")} />
// //       </Section>
// //       <div className="px-2 py-1 text-right text-[11px] text-zinc-500">
// //         Type on the page — press Esc to close
// //       </div>
// //     </div>
// //   );
// // }

// // function BlockView({
// //   block,
// //   onToggle,
// //   onChangeText,
// // }: {
// //   block: Block;
// //   onToggle: (id: string) => void;
// //   onChangeText: (id: string, t: string) => void;
// // }) {
// //   const inputBase =
// //     "w-full bg-transparent outline-none prose-input placeholder-dim";
// //   switch (block.type) {
// //     case "heading1":
// //       return (
// //         <input
// //           className={cx(inputBase, "text-4xl font-bold")}
// //           placeholder="Heading 1"
// //           defaultValue={block.text}
// //           onBlur={(e) => {
// //             const val = e.currentTarget?.value ?? "";
// //             if (block?.id) onChangeText(block.id, val);
// //           }}
// //         />
// //       );
// //     case "heading2":
// //       return (
// //         <input
// //           className={cx(inputBase, "text-2xl font-semibold")}
// //           placeholder="Heading 2"
// //           defaultValue={block.text}
// //           onBlur={(e) => {
// //             const val = e.currentTarget?.value ?? "";
// //             if (block?.id) onChangeText(block.id, val);
// //           }}
// //         />
// //       );
// //     case "heading3":
// //       return (
// //         <input
// //           className={cx(inputBase, "text-xl font-semibold")}
// //           placeholder="Heading 3"
// //           defaultValue={block.text}
// //           onBlur={(e) => {
// //             const val = e.currentTarget?.value ?? "";
// //             if (block?.id) onChangeText(block.id, val);
// //           }}
// //         />
// //       );
// //     case "bulleted":
// //       return (
// //         <div className="flex items-start gap-2">
// //           <div className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-300"></div>
// //           <input
// //             className={inputBase}
// //             placeholder="List item"
// //             defaultValue={block.text}
// //             onBlur={(e) => {
// //               const val = e.currentTarget?.value ?? "";
// //               if (block?.id) onChangeText(block.id, val);
// //             }}
// //           />
// //         </div>
// //       );
// //     case "numbered":
// //       return (
// //         <div className="flex items-start gap-2">
// //           <div className="mt-1 text-zinc-400">1.</div>
// //           <input
// //             className={inputBase}
// //             placeholder="Numbered item"
// //             defaultValue={block.text}
// //             onBlur={(e) => {
// //               const val = e.currentTarget?.value ?? "";
// //               if (block?.id) onChangeText(block.id, val);
// //             }}
// //           />
// //         </div>
// //       );
// //     case "todo":
// //       return (
// //         <div className="flex items-center gap-2">
// //           <input type="checkbox" className="h-4 w-4" />
// //           <input
// //             className={inputBase}
// //             placeholder="To-do"
// //             defaultValue={block.text}
// //             onBlur={(e) => {
// //               const val = e.currentTarget?.value ?? "";
// //               if (block?.id) onChangeText(block.id, val);
// //             }}
// //           />
// //         </div>
// //       );
// //     case "toggle":
// //       return (
// //         <div>
// //           <button
// //             className="inline-flex items-center gap-2 text-zinc-200 hover:text-white"
// //             onClick={() => onToggle(block.id)}
// //           >
// //             {block.collapsed ? <FaChevronRight /> : <FaChevronDown />}
// //             <span className="font-medium">{block.text || "Toggle"}</span>
// //           </button>
// //           {!block.collapsed && (
// //             <div className="ml-6 mt-2 space-y-2">
// //               {(block.children ?? []).map((c) => (
// //                 <div
// //                   key={c.id}
// //                   className="rounded-lg border border-[var(--sf-border)] p-2 text-sm text-zinc-300"
// //                 >
// //                   {c.text || "Nested content…"}
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       );
// //     case "divider":
// //       return <div className="my-2 h-px bg-[var(--sf-border)]" />;
// //     case "quote":
// //       return (
// //         <div className="flex gap-3">
// //           <div className="mt-1 w-1 rounded bg-zinc-600/70" />
// //           <input
// //             className={cx(inputBase, "italic text-zinc-300")}
// //             placeholder="Quote"
// //             defaultValue={block.text}
// //             onBlur={(e) => {
// //               const val = e.currentTarget?.value ?? "";
// //               if (block?.id) onChangeText(block.id, val);
// //             }}
// //           />
// //         </div>
// //       );
// //     case "callout":
// //       return (
// //         <div className="flex items-start gap-3 rounded-xl border border-[var(--sf-border)] bg-[var(--sf-panel)] px-3 py-2">
// //           <span className="mt-1">💡</span>
// //           <input
// //             className={inputBase}
// //             placeholder="Callout"
// //             defaultValue={block.text}
// //             onBlur={(e) => {
// //               const val = e.currentTarget?.value ?? "";
// //               if (block?.id) onChangeText(block.id, val);
// //             }}
// //           />
// //         </div>
// //       );
// //     case "image":
// //       return (
// //         <div className="rounded-xl border border-[var(--sf-border)] p-6 text-sm text-zinc-400">
// //           🖼️ Image placeholder
// //         </div>
// //       );
// //     case "video":
// //       return (
// //         <div className="rounded-xl border border-[var(--sf-border)] p-6 text-sm text-zinc-400">
// //           🎬 Video placeholder
// //         </div>
// //       );
// //     case "audio":
// //       return (
// //         <div className="rounded-xl border border-[var(--sf-border)] p-6 text-sm text-zinc-400">
// //           🎵 Audio placeholder
// //         </div>
// //       );
// //     case "code":
// //       return (
// //         <textarea
// //           className="w-full rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)] p-3 font-mono text-sm"
// //           placeholder="Code…"
// //           defaultValue={block.text}
// //           onBlur={(e) => {
// //             const val = e.currentTarget?.value ?? "";
// //             if (block?.id) onChangeText(block.id, val);
// //           }}
// //         />
// //       );
// //     case "table":
// //       return (
// //         <div className="rounded-xl border border-[var(--sf-border)] p-3 text-sm text-zinc-300">
// //           📊 Table (placeholder)
// //         </div>
// //       );
// //     case "page":
// //       return (
// //         <div className="rounded-lg border border-[var(--sf-border)] p-3">
// //           📄 Sub-page:&nbsp;
// //           <input
// //             className="bg-transparent outline-none"
// //             placeholder="Untitled"
// //             defaultValue={block.text}
// //             onBlur={(e) => {
// //               const val = e.currentTarget?.value ?? "";
// //               if (block?.id) onChangeText(block.id, val);
// //             }}
// //           />
// //         </div>
// //       );
// //     default:
// //       return (
// //         <input
// //           className={inputBase}
// //           placeholder="Type '/' for commands"
// //           defaultValue={block.text}
// //           onBlur={(e) => {
// //             const val = e.currentTarget?.value ?? "";
// //             if (block?.id) onChangeText(block.id, val);
// //           }}
// //         />
// //       );
// //   }
// // }

// // export default function SunforgePage() {
// //   const [meta, setMeta] = React.useState<PageMeta>({
// //     id: uuid(),
// //     title: "Untitled",
// //     createdAt: new Date().toISOString(),
// //     updatedAt: new Date().toISOString(),
// //     createdBy: "You",
// //     updatedBy: "You",
// //     icon: "🧭",
// //     cover: "",
// //     properties: {},
// //     permissions: { visibility: "private" },
// //     parent: { type: "root" },
// //   });
// //   const [blocks, setBlocks] = React.useState<Block[]>([
// //     {
// //       id: uuid(),
// //       type: "heading1",
// //       text: "🔑 What makes a Notion page unique?",
// //     },
// //     {
// //       id: uuid(),
// //       type: "text",
// //       text: "Each page is a block, and contains other blocks. Try the / menu below to add more.",
// //     },
// //   ]);
// //   const [slashPos, setSlashPos] = React.useState<{
// //     x: number;
// //     y: number;
// //   } | null>(null);
// //   const insertBlock = (t: BlockType) =>
// //     setBlocks((p) => [...p, { id: uuid(), type: t, text: "" }]);
// //   const toggleBlock = (id: string) =>
// //     setBlocks((p) =>
// //       p.map((b) => (b.id === id ? { ...b, collapsed: !b.collapsed } : b))
// //     );
// //   const changeText = (id: string, t: string) => {
// //     setBlocks((p) => p.map((b) => (b.id === id ? { ...b, text: t } : b)));
// //     setMeta((m) => ({ ...m, updatedAt: new Date().toISOString() }));
// //   };
// //   React.useEffect(() => {
// //     const onKey = (e: KeyboardEvent) => {
// //       if (e.key === "/") {
// //         const sel = window.getSelection();
// //         if (!sel || sel.rangeCount === 0) return;
// //         const range = sel.getRangeAt(0);
// //         if (!range || !range.getBoundingClientRect) return;
// //         const rect = range.getBoundingClientRect();
// //         if (!rect) return;
// //         setSlashPos({ x: rect.left, y: rect.bottom + 8 });
// //       } else if (e.key === "Escape") {
// //         setSlashPos(null);
// //       }
// //     };
// //     window.addEventListener("keydown", onKey);
// //     return () => window.removeEventListener("keydown", onKey);
// //   }, []);
// //   return (
// //     <div className="relative">
// //       <div className="mb-6">
// //         <div className="h-40 w-full rounded-2xl border border-[var(--sf-border)] bg-gradient-to-br from-[#151a21] to-[#0c1013]"></div>
// //         <div className="mt-4 flex items-center gap-3">
// //           <button className="text-3xl" title="Change icon">
// //             {meta.icon}
// //           </button>
// //           <input
// //             className="flex-1 bg-transparent text-4xl font-bold outline-none placeholder-dim"
// //             placeholder="Untitled"
// //             defaultValue={meta.title}
// //             onBlur={(e) =>
// //               setMeta((m) => ({
// //                 ...m,
// //                 title: e.currentTarget.value || "Untitled",
// //               }))
// //             }
// //           />
// //         </div>
// //       </div>
// //       <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
// //         <span>
// //           Page ID: <code className="text-zinc-300">{meta.id}</code>
// //         </span>
// //         <span>•</span>
// //         <span>Created {new Date(meta.createdAt).toLocaleString()}</span>
// //         <span>•</span>
// //         <span>Last edited {new Date(meta.updatedAt).toLocaleString()}</span>
// //         <span>•</span>
// //         <span>Visibility: {meta.permissions?.visibility}</span>
// //       </div>
// //       <div className="space-y-3">
// //         {blocks.map((b) => (
// //           <div
// //             key={b.id}
// //             className="group relative rounded-lg px-2 py-1 hover:bg-[var(--sf-hover)]/40"
// //           >
// //             <div className="absolute -left-8 top-2 opacity-0 transition group-hover:opacity-100">
// //               <button
// //                 className="rounded-md p-1 hover:bg-[var(--sf-hover)]"
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   setSlashPos({ x: e.clientX, y: e.clientY });
// //                 }}
// //                 title="Add block"
// //               >
// //                 <FaPlus />
// //               </button>
// //             </div>
// //             <BlockView
// //               block={b}
// //               onToggle={toggleBlock}
// //               onChangeText={changeText || ""}
// //             />
// //           </div>
// //         ))}
// //         <div className="pt-4">
// //           <button
// //             className="inline-flex items-center gap-2 rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)] px-3 py-2 text-sm text-zinc-300 hover:bg-[var(--sf-hover)]"
// //             onClick={(e) => {
// //               e.preventDefault();
// //               setSlashPos({ x: e.clientX, y: e.clientY });
// //             }}
// //           >
// //             <FaPlus /> Add block
// //           </button>
// //         </div>
// //       </div>
// //       <div className="fixed bottom-6 right-6">
// //         <InlineToolbar />
// //       </div>
// //       {slashPos && (
// //         <div className="fixed inset-0 z-40" onClick={() => setSlashPos(null)}>
// //           <SlashMenu
// //             x={slashPos.x}
// //             y={slashPos.y}
// //             onClose={() => setSlashPos(null)}
// //             onInsert={insertBlock}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { cx } from "@emotion/css";
// import {
//   FaPlus,
//   FaHeading,
//   FaListUl,
//   FaListOl,
//   FaCheckSquare,
//   FaChevronDown,
//   FaChevronRight,
//   FaQuoteLeft,
//   FaMinus,
//   FaExternalLinkAlt,
//   FaImage,
//   FaVideo,
//   FaMusic,
//   FaCode,
//   FaFile,
//   FaLink,
//   FaDatabase,
//   FaRegSmile,
//   FaCalendar,
//   FaMapMarkedAlt,
//   FaChartBar,
//   FaChartLine,
//   FaChartPie,
//   FaColumns,
//   FaPen,
//   FaRobot,
//   FaTasks,
//   FaUser,
//   FaStickyNote,
//   FaCopy,
//   FaBold,
//   FaItalic,
//   FaUnderline,
//   FaHighlighter,
//   FaAlignLeft,
//   FaAlignCenter,
//   FaAlignRight,
//   FaAlignJustify,
//   FaClock,
//   FaUserCircle,
//   FaBook,
//   FaStar,
//   FaRegStar,
//   FaEllipsisH,
//   FaGlobe,
//   FaColumns as FaCols,
//   FaTrashAlt,
//   FaProjectDiagram,
// } from "react-icons/fa";
// import { MdToggleOn, MdOutlineTableChart } from "react-icons/md";
// import { PiFlowArrowBold } from "react-icons/pi";
// import {
//   SiMendeley,
//   SiGoogledrive,
//   SiGithub,
//   SiGooglemaps,
//   SiLoom,
//   SiSlack,
//   SiJira,
//   SiDropbox,
//   SiMiro,
//   SiExcalidraw,
//   SiSketchup,
//   SiAdobexd,
// } from "react-icons/si";
// import { DiOnedrive } from "react-icons/di";

// declare const __API_BASE__: string;
// const API_BASE =
//   typeof __API_BASE__ !== "undefined" ? __API_BASE__ : "http://localhost:5005";

// const uuid = () =>
//   (globalThis.crypto?.randomUUID?.() as string) ??
//   `${Math.random().toString(36).slice(2)}-${Date.now()}`;

// type BlockType =
//   | "text"
//   | "heading1"
//   | "heading2"
//   | "heading3"
//   | "bulleted"
//   | "numbered"
//   | "todo"
//   | "toggle"
//   | "divider"
//   | "quote"
//   | "callout"
//   | "image"
//   | "video"
//   | "audio"
//   | "code"
//   | "file"
//   | "link"
//   | "table"
//   | "database"
//   | "tableofcontents"
//   | "equation"
//   | "breadcrumbs"
//   | "button"
//   | "synced"
//   | "columns2"
//   | "columns3"
//   | "columns4"
//   | "columns5"
//   | "mermaid"
//   | "page"
//   | "ai"
//   | "embed"
//   | "mention"
//   | "date"
//   | "emoji"
//   | "inline-equation";

// type Block = {
//   id: string;
//   type: BlockType;
//   text?: string;
//   props?: Record<string, any>;
//   children?: Block[];
//   collapsed?: boolean;
// };

// type PageMeta = {
//   id: string;
//   icon?: string;
//   cover?: string;
//   title: string;
//   createdAt: string;
//   updatedAt: string;
//   createdBy: string;
//   updatedBy: string;
//   properties?: Record<string, any>;
//   permissions?: {
//     visibility: "private" | "workspace" | "public";
//     editors?: string[];
//   };
//   parent?: { type: "page" | "database" | "root"; id?: string };
// };

// function InlineToolbar() {
//   return (
//     <div className="flex items-center gap-1 rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)] px-2 py-1 text-sm text-zinc-200 shadow">
//       <button className="p-1 rounded hover:bg-[var(--sf-hover)]" title="Bold">
//         <FaBold />
//       </button>
//       <button className="p-1 rounded hover:bg-[var(--sf-hover)]" title="Italic">
//         <FaItalic />
//       </button>
//       <button
//         className="p-1 rounded hover:bg-[var(--sf-hover)]"
//         title="Underline"
//       >
//         <FaUnderline />
//       </button>
//       <button
//         className="p-1 rounded hover:bg-[var(--sf-hover)]"
//         title="Highlight"
//       >
//         <FaHighlighter />
//       </button>
//       <div className="mx-1 h-4 w-px bg-[var(--sf-border)]" />
//       <button
//         className="p-1 rounded hover:bg-[var(--sf-hover)]"
//         title="Align left"
//       >
//         <FaAlignLeft />
//       </button>
//       <button
//         className="p-1 rounded hover:bg-[var(--sf-hover)]"
//         title="Align center"
//       >
//         <FaAlignCenter />
//       </button>
//       <button
//         className="p-1 rounded hover:bg-[var(--sf-hover)]"
//         title="Align right"
//       >
//         <FaAlignRight />
//       </button>
//       <button
//         className="p-1 rounded hover:bg-[var(--sf-hover)]"
//         title="Justify"
//       >
//         <FaAlignJustify />
//       </button>
//     </div>
//   );
// }

// function Section({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="mb-2">
//       <div className="px-2 py-1 text-[11px] uppercase tracking-wide text-zinc-500">
//         {title}
//       </div>
//       <div className="grid grid-cols-2 gap-1">{children}</div>
//     </div>
//   );
// }

// function SlashMenu({
//   x,
//   y,
//   onClose,
//   onInsert,
// }: {
//   x: number;
//   y: number;
//   onClose: () => void;
//   onInsert: (t: BlockType) => void;
// }) {
//   const make = (t: BlockType) => () => {
//     onInsert(t);
//     onClose();
//   };
//   const Item = ({
//     icon,
//     label,
//     action,
//   }: {
//     icon: React.ReactNode;
//     label: string;
//     action: () => void;
//   }) => (
//     <button
//       className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-[var(--sf-hover)]"
//       onClick={action}
//     >
//       <span className="opacity-90">{icon}</span>
//       <span className="truncate">{label}</span>
//     </button>
//   );
//   return (
//     <div
//       className="fixed z-50 w-[520px] max-h-[420px] overflow-y-auto rounded-2xl border border-[var(--sf-border)] bg-[var(--sf-panel)] p-2 shadow-2xl"
//       style={{ left: x, top: y }}
//       onClick={(e) => e.stopPropagation()}
//       onContextMenu={(e) => e.preventDefault()}
//     >
//       <Section title="Suggested">
//         <Item icon={<FaRobot />} label="AI Meeting Notes" action={make("ai")} />
//         <Item icon={<FaRobot />} label="AI Block" action={make("ai")} />
//       </Section>
//       <Section title="Basic blocks">
//         <Item icon={<FaPen />} label="Text" action={make("text")} />
//         <Item
//           icon={<FaHeading />}
//           label="Heading 1"
//           action={make("heading1")}
//         />
//         <Item
//           icon={<FaHeading />}
//           label="Heading 2"
//           action={make("heading2")}
//         />
//         <Item
//           icon={<FaHeading />}
//           label="Heading 3"
//           action={make("heading3")}
//         />
//         <Item
//           icon={<FaListUl />}
//           label="Bulleted list"
//           action={make("bulleted")}
//         />
//         <Item
//           icon={<FaListOl />}
//           label="Numbered list"
//           action={make("numbered")}
//         />
//         <Item
//           icon={<FaCheckSquare />}
//           label="To-do list"
//           action={make("todo")}
//         />
//         <Item
//           icon={<MdToggleOn />}
//           label="Toggle list"
//           action={make("toggle")}
//         />
//         <Item icon={<FaBook />} label="Page" action={make("page")} />
//         <Item
//           icon={<FaStickyNote />}
//           label="Callout"
//           action={make("callout")}
//         />
//         <Item icon={<FaQuoteLeft />} label="Quote" action={make("quote")} />
//         <Item
//           icon={<MdOutlineTableChart />}
//           label="Table"
//           action={make("table")}
//         />
//         <Item icon={<FaMinus />} label="Divider" action={make("divider")} />
//         <Item icon={<FaLink />} label="Link to page" action={make("link")} />
//       </Section>
//       <Section title="Sunforge AI">
//         <Item icon={<FaRobot />} label="Continue writing" action={make("ai")} />
//         <Item icon={<FaRobot />} label="Ask a question" action={make("ai")} />
//         <Item
//           icon={<FaRobot />}
//           label="Ask about this page"
//           action={make("ai")}
//         />
//         <Item icon={<FaTasks />} label="Add a summary" action={make("ai")} />
//         <Item icon={<FaTasks />} label="Add action items" action={make("ai")} />
//         <Item icon={<FaRobot />} label="More…" action={make("ai")} />
//         <Item
//           icon={<MdOutlineTableChart />}
//           label="Make a Table"
//           action={make("table")}
//         />
//         <Item
//           icon={<PiFlowArrowBold />}
//           label="Make a flowchart"
//           action={make("mermaid")}
//         />
//         <Item icon={<FaRobot />} label="Brainstorm ideas" action={make("ai")} />
//         <Item
//           icon={<FaCode />}
//           label="Get help with code"
//           action={make("code")}
//         />
//         <Item icon={<FaCopy />} label="Draft an outline" action={make("ai")} />
//         <Item icon={<FaCopy />} label="Draft an email" action={make("ai")} />
//         <Item icon={<FaCopy />} label="Draft a PR" action={make("ai")} />
//         <Item
//           icon={<FaCopy />}
//           label="Draft a meeting agenda"
//           action={make("ai")}
//         />
//         <Item icon={<FaCopy />} label="Draft anything" action={make("ai")} />
//       </Section>
//       <Section title="Media">
//         <Item icon={<FaImage />} label="Image" action={make("image")} />
//         <Item icon={<FaVideo />} label="Video" action={make("video")} />
//         <Item icon={<FaMusic />} label="Audio" action={make("audio")} />
//         <Item icon={<FaCode />} label="Code" action={make("code")} />
//         <Item icon={<FaFile />} label="File" action={make("file")} />
//         <Item
//           icon={<FaExternalLinkAlt />}
//           label="Web bookmark"
//           action={make("embed")}
//         />
//       </Section>
//       <Section title="Database">
//         <Item
//           icon={<MdOutlineTableChart />}
//           label="Table view"
//           action={make("database")}
//         />
//         <Item
//           icon={<FaColumns />}
//           label="Board view"
//           action={make("database")}
//         />
//         <Item
//           icon={<FaImage />}
//           label="Gallery view"
//           action={make("database")}
//         />
//         <Item icon={<FaListUl />} label="List view" action={make("database")} />
//         <Item icon={<FaListUl />} label="Feed view" action={make("database")} />
//         <Item
//           icon={<FaCalendar />}
//           label="Calendar view"
//           action={make("database")}
//         />
//         <Item
//           icon={<FaClock />}
//           label="Timeline view"
//           action={make("database")}
//         />
//         <Item
//           icon={<FaMapMarkedAlt />}
//           label="Map view"
//           action={make("database")}
//         />
//         <Item
//           icon={<FaChartBar />}
//           label="Vertical bar chart"
//           action={make("database")}
//         />
//         <Item
//           icon={<FaChartBar />}
//           label="Horizontal bar chart"
//           action={make("database")}
//         />
//         <Item
//           icon={<FaChartLine />}
//           label="Line chart"
//           action={make("database")}
//         />
//         <Item
//           icon={<FaChartPie />}
//           label="Donut chart"
//           action={make("database")}
//         />
//         <Item icon={<FaTasks />} label="Form" action={make("database")} />
//         <Item
//           icon={<FaDatabase />}
//           label="Database - inline"
//           action={make("database")}
//         />
//         <Item
//           icon={<FaDatabase />}
//           label="Database - full page"
//           action={make("database")}
//         />
//         <Item
//           icon={<FaLink />}
//           label="Linked view of data source"
//           action={make("database")}
//         />
//       </Section>
//       <Section title="Advanced blocks">
//         <Item
//           icon={<FaListOl />}
//           label="Table of contents"
//           action={make("tableofcontents")}
//         />
//         <Item
//           icon={<FaCode />}
//           label="Block equation"
//           action={make("equation")}
//         />
//         <Item icon={<FaTasks />} label="Button" action={make("button")} />
//         <Item
//           icon={<FaLink />}
//           label="Breadcrumbs"
//           action={make("breadcrumbs")}
//         />
//         <Item icon={<FaLink />} label="Synced block" action={make("synced")} />
//         <Item
//           icon={<FaHeading />}
//           label="Toggle heading 1"
//           action={make("toggle")}
//         />
//         <Item
//           icon={<FaHeading />}
//           label="Toggle heading 2"
//           action={make("toggle")}
//         />
//         <Item
//           icon={<FaHeading />}
//           label="Toggle heading 3"
//           action={make("toggle")}
//         />
//         <Item
//           icon={<FaColumns />}
//           label="2 Columns"
//           action={make("columns2")}
//         />
//         <Item
//           icon={<FaColumns />}
//           label="3 Columns"
//           action={make("columns3")}
//         />
//         <Item
//           icon={<FaColumns />}
//           label="4 Columns"
//           action={make("columns4")}
//         />
//         <Item
//           icon={<FaColumns />}
//           label="5 Columns"
//           action={make("columns5")}
//         />
//         <Item icon={<FaCode />} label="Code-Mermaid" action={make("mermaid")} />
//         <Item icon={<FaRobot />} label="AI Block" action={make("ai")} />
//       </Section>
//       <Section title="Inline">
//         <Item
//           icon={<FaUser />}
//           label="Mention a person"
//           action={make("mention")}
//         />
//         <Item
//           icon={<FaLink />}
//           label="Mention a page or data source"
//           action={make("mention")}
//         />
//         <Item
//           icon={<FaCalendar />}
//           label="Date or reminder"
//           action={make("date")}
//         />
//         <Item icon={<FaRegSmile />} label="Emoji" action={make("emoji")} />
//         <Item
//           icon={<FaCode />}
//           label="Inline equation"
//           action={make("inline-equation")}
//         />
//       </Section>
//       <Section title="Embeds">
//         <Item
//           icon={<FaExternalLinkAlt />}
//           label="Embed"
//           action={make("embed")}
//         />
//         <Item
//           icon={<SiGoogledrive />}
//           label="Google Drive"
//           action={make("embed")}
//         />
//         <Item icon={<SiGithub />} label="Github Gist" action={make("embed")} />
//         <Item
//           icon={<SiGooglemaps />}
//           label="Google Map"
//           action={make("embed")}
//         />
//         <Item icon={<FaChartBar />} label="Sigma" action={make("embed")} />
//         <Item icon={<SiMendeley />} label="Whimsical" action={make("embed")} />
//         <Item icon={<SiMiro />} label="Miro" action={make("embed")} />
//         <Item icon={<SiSketchup />} label="Sketch" action={make("embed")} />
//         <Item
//           icon={<SiExcalidraw />}
//           label="Excalidraw"
//           action={make("embed")}
//         />
//         <Item icon={<FaFile />} label="PDF" action={make("embed")} />
//         <Item icon={<FaFile />} label="Words" action={make("embed")} />
//         <Item icon={<SiLoom />} label="Loom" action={make("embed")} />
//         <Item icon={<FaTasks />} label="Typeform" action={make("embed")} />
//         <Item icon={<FaCode />} label="CodePen" action={make("embed")} />
//         <Item icon={<SiJira />} label="Jira" action={make("embed")} />
//         <Item icon={<SiSlack />} label="Slack" action={make("embed")} />
//         <Item icon={<SiDropbox />} label="Dropbox" action={make("embed")} />
//         <Item icon={<DiOnedrive />} label="OneDrive" action={make("embed")} />
//         <Item
//           icon={<FaProjectDiagram />}
//           label="Lucidchart"
//           action={make("embed")}
//         />
//         <Item icon={<SiMendeley />} label="Eraser" action={make("embed")} />
//         <Item icon={<SiMendeley />} label="Plus" action={make("embed")} />
//         <Item icon={<SiAdobexd />} label="Adobe XD" action={make("embed")} />
//         <Item icon={<FaTasks />} label="Shortcut" action={make("embed")} />
//         <Item
//           icon={<FaExternalLinkAlt />}
//           label="SendOwl"
//           action={make("embed")}
//         />
//         <Item
//           icon={<FaExternalLinkAlt />}
//           label="Zendesk"
//           action={make("embed")}
//         />
//         <Item
//           icon={<FaExternalLinkAlt />}
//           label="Discord"
//           action={make("embed")}
//         />
//         <Item
//           icon={<FaUserCircle />}
//           label="Google Contacts"
//           action={make("embed")}
//         />
//       </Section>
//       <Section title="Import">
//         <Item icon={<FaFile />} label="CSV" action={make("file")} />
//         <Item icon={<FaFile />} label="HTML" action={make("file")} />
//         <Item icon={<FaFile />} label="JSON" action={make("file")} />
//         <Item icon={<FaFile />} label="Text & Markdown" action={make("file")} />
//         <Item
//           icon={<SiDropbox />}
//           label="Dropbox Paper"
//           action={make("file")}
//         />
//         <Item
//           icon={<FaExternalLinkAlt />}
//           label="Trello"
//           action={make("file")}
//         />
//         <Item icon={<FaFile />} label="Word" action={make("file")} />
//         <Item icon={<FaFile />} label="Zip" action={make("file")} />
//         <Item icon={<FaFile />} label="PDF" action={make("file")} />
//       </Section>
//       <div className="px-2 py-1 text-right text-[11px] text-zinc-500">
//         Type on the page — press Esc to close
//       </div>
//     </div>
//   );
// }

// function PageMenu({
//   x,
//   y,
//   onFavorite,
//   isFavorite,
//   onCopyLink,
//   onDuplicate,
//   onRename,
//   onMove,
//   onTrash,
//   onOpenNew,
//   onOpenPeek,
//   lastEditedBy,
//   lastEditedAt,
// }: {
//   x: number;
//   y: number;
//   onFavorite: () => void;
//   isFavorite: boolean;
//   onCopyLink: () => void;
//   onDuplicate: () => void;
//   onRename: () => void;
//   onMove: () => void;
//   onTrash: () => void;
//   onOpenNew: () => void;
//   onOpenPeek: () => void;
//   lastEditedBy: string;
//   lastEditedAt: string;
// }) {
//   const Row = ({
//     icon,
//     label,
//     action,
//     danger,
//   }: {
//     icon: React.ReactNode;
//     label: string;
//     action: () => void;
//     danger?: boolean;
//   }) => (
//     <button
//       className={cx(
//         "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left hover:bg-zinc-900/80",
//         danger ? "text-red-400" : "text-zinc-200"
//       )}
//       onClick={action}
//     >
//       <span className="opacity-90">{icon}</span>
//       <span>{label}</span>
//     </button>
//   );
//   return (
//     <div className="min-w-[260px] rounded-xl border border-zinc-800 bg-[#0D1014] shadow-2xl p-1 text-sm select-none">
//       <Row
//         icon={isFavorite ? <FaStar /> : <FaRegStar />}
//         label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
//         action={onFavorite}
//       />
//       <div className="my-1 h-px bg-zinc-800" />
//       <Row icon={<FaLink />} label="Copy link" action={onCopyLink} />
//       <Row icon={<FaCopy />} label="Duplicate" action={onDuplicate} />
//       <Row icon={<FaPen />} label="Rename" action={onRename} />
//       <Row icon={<FaColumns />} label="Move to" action={onMove} />
//       <Row
//         icon={<FaTrashAlt />}
//         label="Move to Trash"
//         action={onTrash}
//         danger
//       />
//       <div className="my-1 h-px bg-zinc-800" />
//       <Row icon={<FaGlobe />} label="Turn into wiki" action={() => {}} />
//       <div className="my-1 h-px bg-zinc-800" />
//       <Row
//         icon={<FaExternalLinkAlt />}
//         label="Open in new tab"
//         action={onOpenNew}
//       />
//       <Row icon={<FaCols />} label="Open in side peek" action={onOpenPeek} />
//       <div className="my-1 h-px bg-zinc-800" />
//       <div className="px-2 py-1 text-[11px] text-zinc-500">
//         Last edited by {lastEditedBy} {lastEditedAt}
//       </div>
//     </div>
//   );
// }

// function BlockView({
//   block,
//   onToggle,
//   onChangeText,
//   onFocus,
// }: {
//   block: Block;
//   onToggle: (id: string) => void;
//   onChangeText: (id: string, t: string) => void;
//   onFocus: () => void;
// }) {
//   const inputBase =
//     "w-full bg-transparent outline-none prose-input placeholder-dim";
//   const common = {
//     onBlur: (e: any) => onChangeText(block.id, e.currentTarget.value ?? ""),
//     onFocus,
//   };
//   switch (block.type) {
//     case "heading1":
//       return (
//         <input
//           {...common}
//           className={cx(inputBase, "text-4xl font-bold")}
//           placeholder="Heading 1"
//           defaultValue={block.text}
//         />
//       );
//     case "heading2":
//       return (
//         <input
//           {...common}
//           className={cx(inputBase, "text-2xl font-semibold")}
//           placeholder="Heading 2"
//           defaultValue={block.text}
//         />
//       );
//     case "heading3":
//       return (
//         <input
//           {...common}
//           className={cx(inputBase, "text-xl font-semibold")}
//           placeholder="Heading 3"
//           defaultValue={block.text}
//         />
//       );
//     case "bulleted":
//       return (
//         <div className="flex items-start gap-2">
//           <div className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-300"></div>
//           <input
//             {...common}
//             className={inputBase}
//             placeholder="List item"
//             defaultValue={block.text}
//           />
//         </div>
//       );
//     case "numbered":
//       return (
//         <div className="flex items-start gap-2">
//           <div className="mt-1 text-zinc-400">1.</div>
//           <input
//             {...common}
//             className={inputBase}
//             placeholder="Numbered item"
//             defaultValue={block.text}
//           />
//         </div>
//       );
//     case "todo":
//       return (
//         <div className="flex items-center gap-2">
//           <input type="checkbox" className="h-4 w-4" />
//           <input
//             {...common}
//             className={inputBase}
//             placeholder="To-do"
//             defaultValue={block.text}
//           />
//         </div>
//       );
//     case "toggle":
//       return (
//         <div>
//           <button
//             className="inline-flex items-center gap-2 text-zinc-200 hover:text-white"
//             onClick={() => onToggle(block.id)}
//             onFocus={onFocus}
//           >
//             {block.collapsed ? <FaChevronRight /> : <FaChevronDown />}
//             <span className="font-medium">{block.text || "Toggle"}</span>
//           </button>
//           {!block.collapsed && (
//             <div className="ml-6 mt-2 space-y-2">
//               {(block.children ?? []).map((c) => (
//                 <div
//                   key={c.id}
//                   className="rounded-lg border border-[var(--sf-border)] p-2 text-sm text-zinc-300"
//                 >
//                   {c.text || "Nested content…"}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     case "divider":
//       return <div className="my-2 h-px bg-[var(--sf-border)]" />;
//     case "quote":
//       return (
//         <div className="flex gap-3">
//           <div className="mt-1 w-1 rounded bg-zinc-600/70" />
//           <input
//             {...common}
//             className={cx(inputBase, "italic text-zinc-300")}
//             placeholder="Quote"
//             defaultValue={block.text}
//           />
//         </div>
//       );
//     case "callout":
//       return (
//         <div className="flex items-start gap-3 rounded-xl border border-[var(--sf-border)] bg-[var(--sf-panel)] px-3 py-2">
//           <span className="mt-1">💡</span>
//           <input
//             {...common}
//             className={inputBase}
//             placeholder="Callout"
//             defaultValue={block.text}
//           />
//         </div>
//       );
//     case "image":
//       return (
//         <div className="rounded-xl border border-[var(--sf-border)] p-6 text-sm text-zinc-400">
//           🖼️ Image placeholder
//         </div>
//       );
//     case "video":
//       return (
//         <div className="rounded-xl border border-[var(--sf-border)] p-6 text-sm text-zinc-400">
//           🎬 Video placeholder
//         </div>
//       );
//     case "audio":
//       return (
//         <div className="rounded-xl border border-[var(--sf-border)] p-6 text-sm text-zinc-400">
//           🎵 Audio placeholder
//         </div>
//       );
//     case "code":
//       return (
//         <textarea
//           onFocus={onFocus}
//           onBlur={(e) => onChangeText(block.id, e.currentTarget.value)}
//           className="w-full rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)] p-3 font-mono text-sm"
//           placeholder="Code…"
//           defaultValue={block.text}
//         />
//       );
//     case "table":
//       return (
//         <div className="rounded-xl border border-[var(--sf-border)] p-3 text-sm text-zinc-300">
//           📊 Table (placeholder)
//         </div>
//       );
//     case "page":
//       return (
//         <div className="rounded-lg border border-[var(--sf-border)] p-3">
//           📄 Sub-page:&nbsp;
//           <input
//             {...common}
//             className="bg-transparent outline-none"
//             placeholder="Untitled"
//             defaultValue={block.text}
//           />
//         </div>
//       );
//     default:
//       return (
//         <input
//           {...common}
//           className={inputBase}
//           placeholder="Type '/' for commands"
//           defaultValue={block.text}
//         />
//       );
//   }
// }

// function insertAfter<T>(arr: T[], index: number, item: T): T[] {
//   const out = arr.slice();
//   out.splice(index + 1, 0, item);
//   return out;
// }

// export default function NotionPage({ path }: { path?: string }) {
//   const [meta, setMeta] = useState<PageMeta>({
//     id: uuid(),
//     title: "Untitled",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     createdBy: "You",
//     updatedBy: "You",
//     icon: "🧭",
//     cover: "",
//     properties: {},
//     permissions: { visibility: "private" },
//     parent: { type: "root" },
//   });
//   const [blocks, setBlocks] = useState<Block[]>([
//     { id: uuid(), type: "heading1", text: "🙏 Welcome to Sunforge ☀️🔥" },
//     {
//       id: uuid(),
//       type: "text",
//       text: "Type '/' for commands. Add blocks, headings, lists, toggles, media, and sub-pages. The title auto-fills from your first block.",
//     },
//   ]);
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [slashPos, setSlashPos] = useState<{ x: number; y: number } | null>(
//     null
//   );
//   const [menuOpen, setMenuOpen] = useState<boolean>(false);
//   const [menuAnchor, setMenuAnchor] = useState<DOMRect | null>(null);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const userId = "11111111-1111-1111-1111-111111111111";

//   useEffect(() => {
//     if (!path) return;
//     fetch(`${API_BASE}/api/pageByPath?path=${encodeURIComponent(path)}`)
//       .then((r) => (r.ok ? r.json() : null))
//       .then((p) => {
//         if (!p) return;
//         setMeta((m) => ({ ...m, id: p.id, title: p.title || m.title }));
//       })
//       .catch(() => {});
//   }, [path]);

//   useEffect(() => {
//     const first = blocks.find((b) => (b.text?.trim()?.length ?? 0) > 0);
//     if (first && (!meta.title || meta.title === "Untitled")) {
//       setMeta((m) => ({
//         ...m,
//         title: (first.text ?? "Untitled").slice(0, 120),
//       }));
//     }
//   }, [blocks]); // eslint-disable-line

//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "/") {
//         const sel = window.getSelection();
//         if (!sel || sel.rangeCount === 0) return;
//         const rect = sel.getRangeAt(0).getBoundingClientRect();
//         setSlashPos({ x: rect.left, y: rect.bottom + 8 });
//       } else if (e.key === "Escape") {
//         setSlashPos(null);
//         setMenuOpen(false);
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   const indexById = (id: string | null) => blocks.findIndex((b) => b.id === id);
//   const insertBlock = (t: BlockType) => {
//     const newBlock: Block = { id: uuid(), type: t, text: "" };
//     const idx = indexById(selectedId);
//     if (idx >= 0) setBlocks((cur) => insertAfter(cur, idx, newBlock));
//     else setBlocks((cur) => [...cur, newBlock]);
//   };
//   const toggleBlock = (id: string) =>
//     setBlocks((cur) =>
//       cur.map((b) => (b.id === id ? { ...b, collapsed: !b.collapsed } : b))
//     );
//   const changeText = (id: string, t: string) => {
//     setBlocks((cur) => cur.map((b) => (b.id === id ? { ...b, text: t } : b)));
//     setMeta((m) => ({
//       ...m,
//       updatedAt: new Date().toISOString(),
//       updatedBy: "You",
//     }));
//   };

//   const handleFavorite = () => {
//     setIsFavorite((v) => !v);
//     if (meta.id) {
//       fetch(`${API_BASE}/api/favorites/${meta.id}?userId=${userId}`, {
//         method: isFavorite ? "DELETE" : "PUT",
//       }).catch(() => {});
//     }
//   };

//   const copyLink = () =>
//     navigator.clipboard?.writeText(location.origin + (path || "/"));
//   const duplicate = () =>
//     setBlocks((cur) => [...cur.map((b) => ({ ...b, id: uuid() }))]);
//   const rename = () => {
//     const next = prompt("Rename page", meta.title);
//     if (next && next.trim()) setMeta((m) => ({ ...m, title: next.trim() }));
//   };
//   const moveTo = () => alert("Move to… (stub)");
//   const moveToTrash = () => alert("Move to trash (stub)");
//   const openNew = () => window.open(path || location.pathname, "_blank");
//   const openPeek = () => alert("Open in side peek (stub)");

//   const TitleMenu = () => (
//     <PageMenu
//       x={menuAnchor?.left ?? 0}
//       y={(menuAnchor?.bottom ?? 0) + 6}
//       onFavorite={handleFavorite}
//       isFavorite={isFavorite}
//       onCopyLink={copyLink}
//       onDuplicate={duplicate}
//       onRename={rename}
//       onMove={moveTo}
//       onTrash={moveToTrash}
//       onOpenNew={openNew}
//       onOpenPeek={openPeek}
//       lastEditedBy={meta.updatedBy}
//       lastEditedAt={new Date(meta.updatedAt).toLocaleString()}
//     />
//   );

//   return (
//     <div className="relative">
//       <div className="mb-6">
//         <div className="h-40 w-full rounded-2xl border border-[var(--sf-border)] bg-gradient-to-br from-[#151a21] to-[#0c1013]" />
//         <div className="mt-4 flex items-center gap-3">
//           <button className="text-3xl" title="Change icon">
//             {meta.icon}
//           </button>
//           <input
//             className="flex-1 bg-transparent text-4xl font-bold outline-none placeholder-dim"
//             placeholder="Untitled"
//             defaultValue={meta.title}
//             onBlur={(e) =>
//               setMeta((m) => ({
//                 ...m,
//                 title: e.currentTarget.value || "Untitled",
//               }))
//             }
//             onFocus={() => setSelectedId(null)}
//           />
//           <button
//             className="rounded-md p-2 hover:bg-[var(--sf-hover)]"
//             onClick={handleFavorite}
//             title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
//           >
//             {isFavorite ? <FaStar /> : <FaRegStar />}
//           </button>
//           <button
//             className="rounded-md p-2 hover:bg-[var(--sf-hover)]"
//             title="More options"
//             onClick={(e) => {
//               setMenuAnchor(e.currentTarget.getBoundingClientRect());
//               setMenuOpen((o) => !o);
//             }}
//           >
//             <FaEllipsisH />
//           </button>
//           {menuOpen && (
//             <div
//               className="fixed z-50"
//               style={{
//                 left: menuAnchor?.left ?? 0,
//                 top: (menuAnchor?.bottom ?? 0) + 6,
//               }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <TitleMenu />
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
//         <span>
//           Page ID: <code className="text-zinc-300">{meta.id}</code>
//         </span>
//         <span>•</span>
//         <span>Created {new Date(meta.createdAt).toLocaleString()}</span>
//         <span>•</span>
//         <span>Last edited {new Date(meta.updatedAt).toLocaleString()}</span>
//         <span>•</span>
//         <span>Visibility: {meta.permissions?.visibility}</span>
//       </div>

//       <div className="space-y-3">
//         {blocks.map((b) => (
//           <div
//             key={b.id}
//             className="group relative rounded-lg px-2 py-1 hover:bg-[var(--sf-hover)]/40"
//           >
//             <div className="absolute -left-8 top-2 opacity-0 transition group-hover:opacity-100">
//               <button
//                 className="rounded-md p-1 hover:bg-[var(--sf-hover)]"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setSelectedId(b.id);
//                   setSlashPos({ x: e.clientX, y: e.clientY });
//                 }}
//                 title="Add block"
//               >
//                 <FaPlus />
//               </button>
//             </div>
//             <BlockView
//               block={b}
//               onToggle={toggleBlock}
//               onChangeText={changeText}
//               onFocus={() => setSelectedId(b.id)}
//             />
//           </div>
//         ))}
//         <div className="pt-4">
//           <button
//             className="inline-flex items-center gap-2 rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)] px-3 py-2 text-sm text-zinc-300 hover:bg-[var(--sf-hover)]"
//             onClick={(e) => {
//               e.preventDefault();
//               setSelectedId(blocks.at(-1)?.id ?? null);
//               setSlashPos({ x: e.clientX, y: e.clientY });
//             }}
//           >
//             <FaPlus /> Add block
//           </button>
//         </div>
//       </div>

//       <div className="fixed bottom-6 right-6">
//         <InlineToolbar />
//       </div>

//       {slashPos && (
//         <div className="fixed inset-0 z-40" onClick={() => setSlashPos(null)}>
//           <SlashMenu
//             x={slashPos.x}
//             y={slashPos.y}
//             onClose={() => setSlashPos(null)}
//             onInsert={insertBlock}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaBook,
  FaCheckSquare,
  FaCode,
  FaDatabase,
  FaFile,
  FaHeading,
  FaHighlighter,
  FaImage,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaMarkdown,
  FaMinus,
  FaMusic,
  FaPlus,
  FaQuoteLeft,
  FaRobot,
  FaSyncAlt,
  FaTable,
  FaToggleOff,
  FaUnderline,
  FaVideo,
} from "react-icons/fa";
import { GiArtificialIntelligence, GiPlayButton } from "react-icons/gi";
import { LuColumns4, LuTableOfContents } from "react-icons/lu";
import { MdEmojiSymbols, MdOutlineCallToAction } from "react-icons/md";
import React, { useState } from "react";
import { RiArrowDropRightFill, RiFormula } from "react-icons/ri";
import { TbColumns2, TbColumns3 } from "react-icons/tb";

import { CgCalendarDates } from "react-icons/cg";
import { CiText } from "react-icons/ci";
import { GoMention } from "react-icons/go";
import { ImEmbed } from "react-icons/im";
import { SiMermaid } from "react-icons/si";
import { cx } from "@emotion/css";

export type BlockType =
  | "text"
  | "page"
  | "markdown"
  | "heading1"
  | "heading2"
  | "heading3"
  | "bulleted"
  | "numbered"
  | "todo"
  | "toggle"
  | "divider"
  | "quote"
  | "callout"
  | "image"
  | "video"
  | "audio"
  | "code"
  | "file"
  | "link"
  | "table"
  | "database"
  | "tableofcontents"
  | "equation"
  | "breadcrumbs"
  | "button"
  | "synced"
  | "column2"
  | "column3"
  | "column4"
  | "column5"
  | "mermaid"
  | "ai"
  | "embed"
  | "mention"
  | "date"
  | "emoji"
  | "inline-equation";
export type Block = {
  id: string;
  type: BlockType;
  text?: string;
  children?: Block[];
  collapsed?: boolean;
};

type PageMeta = {
  id: string;
  icon?: string;
  cover?: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  properties?: Record<string, string | number | string[] | boolean>;
  permissions?: {
    visibility: "private" | "workspace" | "public";
    editors?: string[];
  };
  parent?: { type: "page" | "database" | "root"; id?: string };
};

const uuid = () =>
  globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);

function InlineToolbar() {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)] px-2 py-1 text-sm text-zinc-200 shadow">
      <button className="p-1 rounded hover:bg-[var(--sf-hover)]" title="Bold">
        <FaBold />
      </button>
      <button className="p-1 rounded hover:bg-[var(--sf-hover)]" title="Italic">
        <FaItalic />
      </button>
      <button
        className="p-1 rounded hover:bg-[var(--sf-hover)]"
        title="Underline"
      >
        <FaUnderline />
      </button>
      <button
        className="p-1 rounded hover:bg-[var(--sf-hover)]"
        title="Highlight"
      >
        <FaHighlighter />
      </button>
      <div className="mx-1 h-4 w-px bg-[var(--sf-border)]" />
      <button
        className="p-1 rounded hover:bg-[var(--sf-hover)]"
        title="Align left"
      >
        <FaAlignLeft />
      </button>
      <button
        className="p-1 rounded hover:bg-[var(--sf-hover)]"
        title="Align center"
      >
        <FaAlignCenter />
      </button>
      <button
        className="p-1 rounded hover:bg-[var(--sf-hover)]"
        title="Align right"
      >
        <FaAlignRight />
      </button>
      <button
        className="p-1 rounded hover:bg-[var(--sf-hover)]"
        title="Justify"
      >
        <FaAlignJustify />
      </button>
    </div>
  );
}

function SlashMenu({
  x,
  y,
  onClose,
  onInsert,
}: {
  x: number;
  y: number;
  onClose: () => void;
  onInsert: (t: BlockType) => void;
}) {
  const Item = ({
    icon,
    label,
    type,
  }: {
    icon: React.ReactNode;
    label: string;
    type: BlockType;
  }) => (
    <button
      className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-zinc-200 hover:bg-[var(--sf-hover)]"
      onClick={() => {
        onInsert(type);
        onClose();
      }}
    >
      <span className="opacity-90">{icon}</span>
      <span>{label}</span>
    </button>
  );
  return (
    <div
      className="fixed z-50 w-[420px] max-h-[420px] overflow-y-auto scroll-hidden rounded-2xl border border-[var(--sf-border)] bg-[var(--sf-panel)] p-2 shadow-2xl"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-2 py-1 text-[11px] uppercase tracking-wide text-zinc-500">
        Suggested
      </div>
      <Item icon={<FaRobot />} label="AI Block" type="text" />
      <div className="px-2 py-1 text-[11px] uppercase tracking-wide text-zinc-500">
        Basic
      </div>
      <div className="grid grid-cols-2 gap-1">
        <Item icon={<CiText />} label="Text" type="text" />
        <Item icon={<FaBook />} label="Page" type="page" />
        <Item icon={<FaMarkdown />} label="Markdown" type="markdown" />
        <Item icon={<FaHeading />} label="Heading 1" type="heading1" />
        <Item icon={<FaHeading />} label="Heading 2" type="heading2" />
        <Item icon={<FaHeading />} label="Heading 3" type="heading3" />
        <Item icon={<FaListUl />} label="Bulleted list" type="bulleted" />
        <Item icon={<FaListOl />} label="Numbered list" type="numbered" />
        <Item icon={<FaCheckSquare />} label="To-do list" type="todo" />
        <Item icon={<FaToggleOff />} label="Toggle" type="toggle" />
        <Item icon={<FaMinus />} label="Divider" type="divider" />
        <Item icon={<FaQuoteLeft />} label="Quote" type="quote" />
        <Item icon={<MdOutlineCallToAction />} label="Callout" type="quote" />
        <Item icon={<FaImage />} label="Image" type="image" />
        <Item icon={<FaVideo />} label="Video" type="video" />
        <Item icon={<FaMusic />} label="Audio" type="audio" />
        <Item icon={<FaCode />} label="Code" type="code" />
        <Item icon={<FaFile />} label="File" type="file" />
        <Item icon={<FaLink />} label="Link" type="link" />
        <Item icon={<FaTable />} label="Table" type="table" />
        <Item
          icon={<LuTableOfContents />}
          label="Table of contents"
          type="tableofcontents"
        />
        <Item icon={<RiFormula />} label="Equation" type="equation" />
        <Item
          icon={<RiArrowDropRightFill />}
          label="Breadcrumbs"
          type="breadcrumbs"
        />
        <Item icon={<GiPlayButton />} label="Button" type="button" />
        <Item icon={<TbColumns2 />} label="Column 2" type="column2" />
        <Item icon={<TbColumns3 />} label="Column 3" type="column3" />
        <Item icon={<LuColumns4 />} label="Column 4" type="column4" />
        {/* <Item icon={<Columns5 />} label="Column 5" type="column5" /> */}
        <Item icon={<CgCalendarDates />} label="Date" type="date" />
        {/* Inline equation pending */}
      </div>

      <div className="px-2 py-1 text-[11px] uppercase tracking-wide text-zinc-500">
        Advanced
      </div>
      <div className="grid grid-cols-2 gap-1">
        <Item icon={<FaDatabase />} label="Database" type="database" />
        <Item icon={<FaSyncAlt />} label="Sunced" type="synced" />
        <Item icon={<SiMermaid />} label="Mermaid" type="mermaid" />
        <Item icon={<ImEmbed />} label="Embed" type="embed" />
        <Item icon={<GiArtificialIntelligence />} label="AI" type="ai" />
        <Item icon={<GoMention />} label="Mention" type="mention" />
        <Item icon={<MdEmojiSymbols />} label="Emoji" type="emoji" />
        <Item icon={<FaLink />} label="Link to page" type="link" />
      </div>
      {/* Have to add remaining or addition options as well */}
      <div className="px-2 py-1 text-right text-[11px] text-zinc-500">
        Type on the page — press Esc to close
      </div>
    </div>
  );
}

function BlockInput({
  block,
  onChange,
}: {
  block: Block;
  onChange: (t: string) => void;
}) {
  const base = "w-full bg-transparent outline-none prose-input placeholder-dim";
  const onBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => onChange(e.currentTarget.value);
  switch (block.type) {
    case "heading1":
      return (
        <input
          className={cx(base, "text-4xl font-bold")}
          placeholder="Heading 1"
          defaultValue={block.text}
          onBlur={onBlur}
        />
      );
    case "heading2":
      return (
        <input
          className={cx(base, "text-2xl font-semibold")}
          placeholder="Heading 2"
          defaultValue={block.text}
          onBlur={onBlur}
        />
      );
    case "heading3":
      return (
        <input
          className={cx(base, "text-xl font-semibold")}
          placeholder="Heading 3"
          defaultValue={block.text}
          onBlur={onBlur}
        />
      );
    case "bulleted":
      return (
        <div className="flex items-start gap-2">
          <div className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-300" />
          <input
            className={base}
            placeholder="List item"
            defaultValue={block.text}
            onBlur={onBlur}
          />
        </div>
      );
    case "numbered":
      return (
        <div className="flex items-start gap-2">
          <div className="mt-1 text-zinc-400">1.</div>
          <input
            className={base}
            placeholder="Numbered item"
            defaultValue={block.text}
            onBlur={onBlur}
          />
        </div>
      );
    case "todo":
      return (
        <div className="flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4" />
          <input
            className={base}
            placeholder="To-do"
            defaultValue={block.text}
            onBlur={onBlur}
          />
        </div>
      );
    case "quote":
      return (
        <div className="flex gap-3">
          <div className="mt-1 w-1 rounded bg-zinc-600/70" />
          <input
            className={cx(base, "italic text-zinc-300")}
            placeholder="Quote"
            defaultValue={block.text}
            onBlur={onBlur}
          />
        </div>
      );
    case "divider":
      return <div className="my-2 h-px bg-[var(--sf-border)]" />;
    case "code":
      return (
        <textarea
          className="w-full rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)] p-3 font-mono text-sm"
          placeholder="Code…"
          defaultValue={block.text}
          onBlur={(e) => onChange(e.currentTarget.value)}
        />
      );
    case "page":
      return (
        <div className="rounded-lg border border-[var(--sf-border)] p-3">
          📄 Sub‑page:&nbsp;
          <input
            className="bg-transparent outline-none"
            placeholder="Untitled"
            defaultValue={block.text}
            onBlur={onBlur}
          />
        </div>
      );
    default:
      return (
        <input
          className={base}
          placeholder="Type '/' for commands"
          defaultValue={block.text}
          onBlur={onBlur}
        />
      );
  }
}

export default function SunForgePageEditor({
  initialTitle = "Untitled",
  onTitleChange,
}: {
  initialTitle?: string;
  onTitleChange?: (t: string) => void;
}) {
  const [meta, setMeta] = useState<PageMeta>({
    id: uuid(),
    title: "Untitled",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "You",
    updatedBy: "You",
    icon: "🧭",
    cover: "",
    properties: {},
    permissions: { visibility: "private" },
    parent: { type: "root" },
  });
  const [title, setTitle] = React.useState(initialTitle);
  const [blocks, setBlocks] = React.useState<Block[]>([
    { id: uuid(), type: "text", text: "Type '/' for commands. Add blocks" },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [slashPos, setSlashPos] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuAnchor, setMenuAnchor] = useState<DOMRect | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [focusId, setFocusId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/") {
        const el = document.activeElement as HTMLElement | null;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setSlashPos({ x: r.left + 16, y: r.bottom + 6 });
      } else if (e.key === "Escape") {
        setSlashPos(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const insertAfterFocused = (t: BlockType) => {
    setBlocks((prev) => {
      const id = focusId;
      if (!id) return [...prev, { id: uuid(), type: t, text: "" }];
      const idx = prev.findIndex((b) => b.id === id);
      if (idx === -1) return [...prev, { id: uuid(), type: t, text: "" }];
      const next = [...prev];
      next.splice(idx + 1, 0, { id: uuid(), type: t, text: "" });
      return next;
    });
  };

  const changeBlock = (id: string, text: string) => {
    setBlocks((p) => p.map((b) => (b.id === id ? { ...b, text } : b)));
    // auto-title from first typed content
    const firstNonEmpty =
      (text.trim() ? id : null) ??
      blocks.find((b) => (b.text ?? "").trim())?.id ??
      null;
    if (firstNonEmpty === id && text.trim()) {
      setTitle(text.trim());
      onTitleChange?.(text.trim());
    }
  };

  return (
    <div className="relative h-full overflow-y-auto px-40 py-8">
      <div className="h-40 w-full rounded-2xl border border-[var(--sf-border)] bg-gradient-to-br from-[#151a21] to-[#0c1013]" />
      <div className="mt-4 flex items-center gap-3">
        <button className="text-3xl" title="Change icon">
          🧭
        </button>
        <input
          className="flex-1 bg-transparent text-4xl font-bold outline-none placeholder-dim"
          placeholder="Untitled"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            onTitleChange?.(e.target.value);
          }}
        />
      </div>

      <div className="mt-6 space-y-3">
        {blocks.map((b) => (
          <div
            key={b.id}
            className="group relative rounded-lg px-2 py-1 hover:bg-[var(--sf-hover)]/40"
            onFocus={() => setFocusId(b.id)}
          >
            <div className="absolute -left-8 top-2 opacity-0 transition group-hover:opacity-100">
              <button
                className="rounded-md p-1 hover:bg-[var(--sf-hover)]"
                onClick={(e) => {
                  e.stopPropagation();
                  setFocusId(b.id);
                  const r = (e.target as HTMLElement).getBoundingClientRect();
                  setSlashPos({ x: r.left, y: r.bottom + 6 });
                }}
                title="Add block"
              >
                <FaPlus />
              </button>
            </div>
            <BlockInput block={b} onChange={(t) => changeBlock(b.id, t)} />
          </div>
        ))}
        <div className="pt-4">
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--sf-border)] bg-[var(--sf-panel)] px-3 py-2 text-sm text-zinc-300 hover:bg-[var(--sf-hover)] overflow-hidden"
            onClick={(e) => {
              const r = (e.target as HTMLElement).getBoundingClientRect();
              setSlashPos({ x: r.left, y: r.bottom + 6 });
            }}
          >
            <FaPlus /> Add block
          </button>
        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <InlineToolbar />
      </div>
      {slashPos && (
        <div className="fixed inset-0 z-40" onClick={() => setSlashPos(null)}>
          <SlashMenu
            x={slashPos.x}
            y={slashPos.y}
            onClose={() => setSlashPos(null)}
            onInsert={insertAfterFocused}
          />
        </div>
      )}
    </div>
  );
}
