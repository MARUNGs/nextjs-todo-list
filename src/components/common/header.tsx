"use client";

import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-row justify-end mt-5 text-white font-bold">
      <Link className="mr-10" href={"/login"}>
        로그인
      </Link>
    </div>
  );
}
