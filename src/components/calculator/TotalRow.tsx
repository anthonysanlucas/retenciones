interface TotalRowProps {
  label: string;
  value?: string;
  muted?: boolean;
}

export function TotalRow({ label, value = "0.00", muted = false }: TotalRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${muted ? "text-gray-400" : "text-gray-600"}`}>
        {label}
      </span>
      <span className={`tabular-nums ${muted ? "text-sm text-gray-400" : "text-base font-bold text-gray-900"}`}>
        ${value}
      </span>
    </div>
  );
}
