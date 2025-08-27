/**
 * 드래그 대상이 되는 카드
 */

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function BoardCard({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>할일제목</CardTitle>
        <CardDescription className="hidden" />
      </CardHeader>
      <CardContent>{title}</CardContent>
    </Card>
  );
}
