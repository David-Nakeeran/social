"use client";
import Link from "next/link";
import { useEffect } from "react";
import { ErrorGlobalProps } from "@/types/dataTypes";

// Error page runs in the client
export default function GlobalErrorPage({ error, reset }: ErrorGlobalProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html>
      <body>
        <h1>Something went wrong!</h1>
        <p>{error.message}</p>
        <Link href={"/timeline"}>Go to timeline</Link>
        <button onClick={() => reset()}>Try Again</button>
      </body>
    </html>
  );
}
