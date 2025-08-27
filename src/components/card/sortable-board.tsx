/**
 * BoardCard 컴포넌트를 감싸 드래그가 가능하게 해주는 영역
 */
"use client";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import BoardCard from "./board-card";
import KanbanColumn from "./kanban-column";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";

type ColumnType = "todo" | "doing" | "done";
type CardItem = { no: number; title: string };
type ColumnState = Record<ColumnType, CardItem[]>;

const initialData: ColumnState = {
  todo: [
    { no: 1, title: "할일 1" },
    { no: 2, title: "할일 2" },
  ],
  doing: [{ no: 1, title: "진행 중 1" }],
  done: [{ no: 1, title: "완료 1" }],
};

export default function SortableBoard({ no, title }: CardItem) {
  const [columns, setColumns] = useState<ColumnState>(initialData);
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeCard, setActiveCard] = useState<CardItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /** 카드 영역을 찾는 함수 */
  const findCardLocation = (id: string): [ColumnType, number] | null => {
    for (const columnId of Object.keys(columns) as ColumnType[]) {
      const idx = columns[columnId].findIndex((item) => String(item.no) === id);
      if (idx !== -1) return [columnId, idx];
    }
    return null;
  };

  /** 드래그 시작 */
  const handleDragStart = (e: DragStartEvent) => {
    const location = findCardLocation(e.active.id.toString());
    if (!location) return;
    const [columnId, idx] = location;
    setActiveCard(columns[columnId][idx]);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveCard(null);

    if (!over || active.id === over.id) return;

    const from = findCardLocation(active.id.toString());
    if (!from) return;
    const [fromColumn, fromIdx] = from;

    const columnIds: ColumnType[] = ["todo", "doing", "done"];

    const isDroppingOnColumn =
      columnIds.includes(over.id as ColumnType) ||
      columnIds.some((id) => over.id === `${id}-placeholder`);

    if (isDroppingOnColumn) {
      const toColumn = String(over.id).replace(
        "-placeholder",
        ""
      ) as ColumnType;
      const fromItems = [...columns[fromColumn]];
      const toItems = [...columns[toColumn]];
      const [moved] = fromItems.splice(fromIdx, 1);
      toItems.push(moved);

      setColumns({
        ...columns,
        [fromColumn]: fromItems,
        [toColumn]: toItems,
      });
      return;
    }

    const to = findCardLocation(over.id.toString());
    if (!to) return;
    const [toColumn, toIdx] = to;

    if (fromColumn === toColumn) {
      const newItems = arrayMove(columns[fromColumn], fromIdx, toIdx);
      setColumns({ ...columns, [fromColumn]: newItems });
    } else {
      const fromItems = [...columns[fromColumn]];
      const toItems = [...columns[toColumn]];
      const [moved] = fromItems.splice(fromIdx, 1);
      toItems.splice(toIdx, 0, moved);

      setColumns({
        ...columns,
        [fromColumn]: fromItems,
        [toColumn]: toItems,
      });
    }
  };

  if (!mounted) return null;
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <DragOverlay>
        {activeCard ? <BoardCard title={activeCard.title} /> : null}
      </DragOverlay>
      <div className="flex gap-4 overflow-auto">
        {(Object.entries(columns) as [ColumnType, CardItem[]][]).map(
          ([columnId, items]) => (
            <SortableContext
              key={columnId}
              items={
                items.length > 0
                  ? items.map((item) => item.no)
                  : [`${columnId}-placeholder`]
              }
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn
                columnId={columnId}
                items={items}
                onAdd={(text) => {
                  const newItem: CardItem = {
                    no: 1,
                    title: text,
                  };
                  setColumns({
                    ...columns,
                    [columnId]: [...columns[columnId], newItem],
                  });
                }}
              />
            </SortableContext>
          )
        )}
      </div>
    </DndContext>
  );
}
