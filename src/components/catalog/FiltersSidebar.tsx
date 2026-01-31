"use client";

type Props = {
  tags: string[];
  selected: string | null;
  onChange: (tag: string | null) => void;
};

export default function FiltersSidebar({ tags, selected, onChange }: Props) {
  return (
    <aside className="w-60 shrink-0">
      <div className="bg-white border rounded-xl p-4 space-y-2">
        <div className="font-semibold mb-2">Категорії</div>

        <button
          onClick={() => onChange(null)}
          className={`block w-full text-left px-3 py-1 rounded ${
            selected === null
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Всі
        </button>

        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onChange(tag)}
            className={`block w-full text-left px-3 py-1 rounded ${
              selected === tag
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </aside>
  );
}
