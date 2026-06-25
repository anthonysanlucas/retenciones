interface SummaryDisplayProps {
  label: string;
  value?: string;
}

export function SummaryDisplay({ label, value = "0.00" }: SummaryDisplayProps) {
  return (
    <div className="flex flex-col gap-2 bg-gray-50 rounded-2xl p-5 border border-gray-100">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </span>
      <span className="text-3xl font-bold text-gray-900 tabular-nums tracking-tight">
        ${value}
      </span>
    </div>
  );
}
