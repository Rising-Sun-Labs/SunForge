import {
  FaColumns,
  FaCopy,
  FaLink,
  FaPen,
  FaRegStar,
  FaStar,
  FaTrashAlt,
} from "react-icons/fa";

import { cx } from "@emotion/css";

export default function PageMenu({
  x,
  y,
  onFavorite,
  isFavorite,
  onCopyLink,
  onDuplicate,
  onRename,
  onMove,
  onTrash,
  onOpenNew,
  onOpenPeek,
  lastEditedBy,
  lastEditedAt,
}: {
  x: number;
  y: number;
  onFavorite: () => void;
  isFavorite: boolean;
  onCopyLink: () => void;
  onDuplicate: () => void;
  onRename: () => void;
  onMove: () => void;
  onTrash: () => void;
  onOpenNew: () => void;
  onOpenPeek: () => void;
  lastEditedBy: string;
  lastEditedAt: string;
}) {
  const Row = ({
    icon,
    label,
    action,
    danger,
  }: {
    icon: React.ReactNode;
    label: string;
    action: () => void;
    danger?: boolean;
  }) => (
    <button
      className={cx(
        "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left hover:bg-zinc-900/80",
        danger ? "text-red-400" : "text-zinc-200"
      )}
      onClick={action}
    >
      <span className="opacity-90">{icon}</span>
      <span>{label}</span>
    </button>
  );
  return (
    <div className="min-w-[260px] rounded-xl border border-zinc-800 bg-[#0D1014] shadow-2xl p-1 text-sm select-none">
      <Row
        icon={isFavorite ? <FaStar /> : <FaRegStar />}
        label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        action={onFavorite}
      />
      <div className="my-1 h-px bg-zinc-800" />
      <Row icon={<FaLink />} label="Copy Link" action={onCopyLink} />
      <Row icon={<FaCopy />} label="Duplicate" action={onDuplicate} />
      <Row icon={<FaPen />} label="Rename" action={onRename} />
      <Row icon={<FaColumns />} label="Move to" action={onMove} />
      <Row
        icon={<FaTrashAlt />}
        label="Move to Trash"
        action={onTrash}
        danger
      />
      {/* <Row icon={<Fa />}/> */}
    </div>
  );
}
