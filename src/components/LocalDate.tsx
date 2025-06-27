"use client";
import { parseISO, format } from "date-fns";
import { DateProps } from "@/types/dataTypes";

export default function LocalDate({ dateString }: DateProps) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>{format(date, "dd MMM yyyy, HH:mm")}</time>
  );
}
