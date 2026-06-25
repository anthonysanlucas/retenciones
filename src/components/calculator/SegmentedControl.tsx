import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  label: string;
  options: Option[];
  defaultValue?: string;
}

export function SegmentedControl({ label, options, defaultValue }: SegmentedControlProps) {
  const [selected, setSelected] = useState(defaultValue ?? options[0]?.value ?? "");

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex flex-wrap gap-1 p-1 bg-gray-100 rounded-xl">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setSelected(opt.value)}
            className={[
              "flex-1 min-w-0 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap",
              selected === opt.value
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700",
            ].join(" ")}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
