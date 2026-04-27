import { NextResponse } from "next/server";
import { downloads } from "@/data/downloads";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "all";

  const filtered = downloads.filter((item) => {
    const matchesCategory =
      category === "all" || item.category === category;
    const matchesSearch =
      query === "" ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return NextResponse.json({
    results: filtered,
    total: filtered.length,
    query,
    category,
  });
}
