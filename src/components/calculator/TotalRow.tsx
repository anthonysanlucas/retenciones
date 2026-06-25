interface TotalRowProps {
  label: string;
  value?: string;
  muted?: boolean;
}

export function TotalRow({ label, value = "0.00", muted = false }: TotalRowProps) {
  if (muted) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-sm text-primary-400">{label}</span>
        <span className="text-sm tabular-nums text-primary-400">${value}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-primary-600">{label}</span>
      <span className="text-2xl font-bold tabular-nums text-primary-700">${value}</span>
    </div>
  );
}
