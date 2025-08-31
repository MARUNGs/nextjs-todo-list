/**
 * 드래그 대상이 되는 카드
 */

"use client";

import { X } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function BoardCard({ title }: { title: string }) {
  const deleteCard = () => {};

  return (
    <Card className="group flex relative">
      <X
        onClick={deleteCard}
        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <CardContent>{title}</CardContent>
    </Card>
  );
}
