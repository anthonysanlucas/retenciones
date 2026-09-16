interface MoneyDisplayProps {
  label: string;
  value?: string;
}

export function MoneyDisplay({ label, value = "-" }: MoneyDisplayProps) {
  const isBlank = value === "-" || value === "—" || value === "";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
      </div>
      <div className="flex items-center justify-between px-4 py-3 bg-stone-100/80 border border-stone-200/80 rounded-xl select-all">
        <span className="text-xs font-medium text-stone-400 select-none">
          {isBlank ? "" : "$"}
        </span>
        <span
          className={`text-base font-semibold tabular-nums ${
            isBlank ? "text-stone-400" : "text-stone-800"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
