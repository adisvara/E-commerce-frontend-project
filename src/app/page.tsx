import Navbar from "@/components/navbar";
import { DataTable } from "@/components/table/data-table";
import type {
  VisibilityState,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import type { SetStateAction } from "react";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-auto">
      <Navbar />
    </main>
  );
}
