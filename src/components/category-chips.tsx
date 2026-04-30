"use client";

export interface CategoryFilter {
  id: string;
  name: string;
  emoji: string;
  type: "category" | "tag";
}

const categoryFilters: CategoryFilter[] = [
  { id: "all", name: "Todos", emoji: " Apps", type: "category" },
  { id: "jogos", name: "Jogos", emoji: " Jogos", type: "category" },
  { id: "softwares", name: "Softwares", emoji: " Softwares", type: "category" },
  { id: "outros", name: "Utilitarios", emoji: " Utilitarios", type: "category" },
  { id: "Design", name: "Design", emoji: " Design", type: "tag" },
  { id: "Ferramentas", name: "Ferramentas", emoji: " Ferramentas", type: "tag" },
  { id: "Midia", name: "Midia", emoji: " Midia", type: "tag" },
  { id: "Seguranca", name: "Seguranca", emoji: " Seguranca", type: "tag" },
  { id: "Produtividade", name: "Produtividade", emoji: " Produtividade", type: "tag" },
];

interface CategoryChipsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeType?: "category" | "tag";
}

export function CategoryChips({
  activeCategory,
  onCategoryChange,
  activeType,
}: CategoryChipsProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide pb-2 -mb-2">
      <div className="flex items-center gap-2 min-w-max sm:flex-wrap sm:min-w-0">
        {categoryFilters.map((filter) => {
          const isActive =
            activeCategory === filter.id &&
            (activeType === undefined || activeType === filter.type);

          return (
            <button
              key={filter.id}
              onClick={() => onCategoryChange(filter.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all duration-200 focus-ring ${
                isActive
                  ? "bg-violet-600/20 border-violet-500/30 text-violet-300"
                  : "bg-white/5 border-white/[0.06] text-zinc-400 hover:bg-white/10 hover:text-zinc-200"
              }`}
            >
              {filter.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { categoryFilters };
