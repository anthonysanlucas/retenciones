interface TotalRowProps {
  label: string;
  value?: string;
  muted?: boolean;
  prefix?: string;
  accent?: "default" | "danger" | "success";
}

export function TotalRow({
  label,
  value = "-",
  muted = false,
  prefix = "$",
  accent = "default",
}: TotalRowProps) {
  const isBlank = value === "-" || value === "—" || value === "";

  if (muted) {
    const valueColorClass = isBlank
      ? "text-gray-400"
      : accent === "success"
      ? "text-primary-700"
      : "text-gray-800";

    return (
      <div className="flex items-center justify-between py-0.5 text-sm">
        <span className="text-gray-600">{label}</span>
        <span className={`tabular-nums font-medium ${valueColorClass}`}>
          {isBlank ? "-" : `${prefix}${value}`}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between pt-1">
      <span className="text-base font-semibold text-gray-900">{label}</span>
      <span
        className={`text-xl font-bold tabular-nums ${
          isBlank ? "text-gray-400" : "text-gray-900"
        }`}
      >
        {isBlank ? "-" : `${prefix}${value}`}
      </span>
    </div>
  );
}
