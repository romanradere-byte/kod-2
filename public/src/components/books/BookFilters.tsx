"use client";

export default function BookFilters({
  tags,
  selectedTag,
  onSelect,
}: {
  tags: string[];
  selectedTag: string | null;
  onSelect: (tag: string | null) => void;
}) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold mb-2">Категорії</h3>

      <button
        onClick={() => onSelect(null)}
        className={`block text-left w-full px-3 py-1 rounded ${
          selectedTag === null ? "bg-blue-600 text-white" : "hover:bg-gray-100"
        }`}
      >
        Всі
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelect(tag)}
          className={`block text-left w-full px-3 py-1 rounded ${
            selectedTag === tag ? "bg-blue-600 text-white" : "hover:bg-gray-100"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
