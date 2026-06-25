interface SummaryDisplayProps {
  label: string;
  value?: string;
}

export function SummaryDisplay({ label, value = "0.00" }: SummaryDisplayProps) {
  return (
    <div className="flex flex-col gap-2.5 bg-stone-100 rounded-2xl px-6 py-5">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
        {label}
      </span>
      <span className="text-3xl font-bold text-gray-900 tabular-nums tracking-tight">
        ${value}
      </span>
    </div>
  );
}
