import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function CatalogSearch({ value, onChange }: Props) {
  return (
    <div className="relative w-full">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
        size={20}
      />
      <input
        className="w-full bg-white border border-gray-200 text-gray-900 rounded-2xl pl-12 pr-4 py-4 shadow-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-gray-400"
        placeholder="Пошук назви або автора..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}