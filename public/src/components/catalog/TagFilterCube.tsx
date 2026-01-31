"use client";

type Props = {
  tags: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
};

export default function TagFilterCube({ tags, selected, onChange }: Props) {
  function toggle(tag: string) {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  }

  return (
    <div className="bg-white border rounded-xl p-4 flex flex-wrap gap-3">
      {tags.map((tag) => {
        const active = selected.includes(tag);

        return (
          <label
            key={tag}
            className={`flex items-center gap-2 px-3 py-1 rounded-full border cursor-pointer select-none transition
              ${active ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-100"}
            `}
          >
            <input
              type="checkbox"
              checked={active}
              onChange={() => toggle(tag)}
              className="hidden"
            />
            {tag}
          </label>
        );
      })}
    </div>
  );
}
