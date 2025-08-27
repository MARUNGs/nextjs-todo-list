"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function PlaceholderCard({ id }: { id: string }) {
  const { setNodeRef, transform, transition, attributes, listeners } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="h-10 border-2 border-dashed rounded opacity-10 flex items-center justify-center text-sm text-gray-500"
    >
      Drop here
    </div>
  );
}
