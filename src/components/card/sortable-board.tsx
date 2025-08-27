/**
 * BoardCard 컴포넌트를 감싸 드래그가 가능하게 해주는 영역
 */
"use client";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
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
import { Button } from "../ui/button";

type ColumnType = "todo" | "doing" | "done";
type CardItem = { id: string; title: string; status: string };
type ColumnState = Record<ColumnType, CardItem[]>;

const initialData: ColumnState = {
  todo: [
    { id: "todo-1", title: "할일 1", status: "10" },
    { id: "todo-2", title: "할일 2", status: "10" },
  ],
  doing: [{ id: "doing-1", title: "진행 중 1", status: "20" }],
  done: [{ id: "done-2", title: "완료 1", status: "30" }],
};

export default function SortableBoard() {
  const [columns, setColumns] = useState<ColumnState>(initialData);
  const sensors = useSensors(useSensor(PointerSensor)); // 마우스, 터치 모두 감지
  const [activeCard, setActiveCard] = useState<CardItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /** 카드 영역을 찾는 함수 */
  const findCardLocation = (id: string): [ColumnType, number] | null => {
    const keys = Object.keys(columns) as ColumnType[];

    for (const columnId of keys) {
      const idx = columns[columnId].findIndex((item) => String(item.id) === id);
      if (idx !== -1) return [columnId, idx];
    }
    return null;
  };

  /** 드래그 시작할 때 해당 todo를 찾아서 활성화 시킨다. */
  const handleDragStart = (e: DragStartEvent) => {
    // 현재 위치 찾기
    const id = e.active.id.toString();
    const location = findCardLocation(id);
    if (!location) return;

    const [columnId, idx] = location;
    setActiveCard(columns[columnId][idx]); // 해당 todo를 활성화
  };

  /** 드랍했을 때 */
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveCard(null); // 드래그 활성화 끄기

    if (!over || active.id === over.id) return;

    // 현재 위치 찾기
    const from = findCardLocation(active.id.toString());
    if (!from) return;

    const [fromColumn, fromIdx] = from;
    const columnIds: ColumnType[] = ["todo", "doing", "done"];
    const overId = over.id as ColumnType;

    // 현재 내가 drop한 columnId
    const isDroppingOnColumn =
      columnIds.includes(overId) ||
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

  /** 새로운 카드 추가 */
  const addCard = (text: string, columnId: ColumnType) => {
    const status =
      columnId === "todo" ? "10" : columnId === "doing" ? "20" : "30";

    const newItem: CardItem = {
      id: uuidv4(),
      title: text,
      status,
    };

    setColumns({
      ...columns,
      [columnId]: [...columns[columnId], newItem],
    });
  };

  if (!mounted) return null;
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">칸반 보드</h1>
      <Button type="button" className="mt-5 mb-5">
        저장
      </Button>

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
                    ? items.map((item) => item.id)
                    : [`${columnId}-placeholder`]
                }
                strategy={verticalListSortingStrategy} // 세로 방향으로 드래그 시, 어떤 위치로 이동해야 하는지를 알려주는 전략
              >
                <KanbanColumn
                  columnId={columnId}
                  items={items}
                  onAdd={(text, columnId) =>
                    addCard(text, columnId as ColumnType)
                  }
                />
              </SortableContext>
            )
          )}
        </div>
      </DndContext>
    </>
  );
}
