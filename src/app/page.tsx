import SortableBoard from "@/components/card/sortable-board";

export default function Home() {
  return (
    <main className="p-8 w-full h-screen mx-auto flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">칸반 보드</h1>
      <SortableBoard no={1} title={"test"} />
    </main>
  );
}
