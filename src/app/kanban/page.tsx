import SortableBoard from "@/components/card/sortable-board";
import { Button } from "@/components/ui/button";

export default function Kanban() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mt-[10%] mb-4">칸반 보드</h1>
      <Button type="button" className="mt-5 mb-5">
        저장
      </Button>
      <SortableBoard />
    </div>
  );
}
