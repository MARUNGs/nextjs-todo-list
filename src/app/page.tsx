"use client";

import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="font-bold text-4xl">SK MEMO</div>
      <div className="mt-10 mb-10 flex gap-2">
        <Badge>TODO</Badge>
        <Badge className="bg-red-700">CALENDAR</Badge>
      </div>
    </div>
  );
}
