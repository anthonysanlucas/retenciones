interface TotalRowProps {
  label: string;
  value?: string;
}

export function TotalRow({ label, value = "0.00" }: TotalRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-base font-bold text-gray-900">${value}</span>
    </div>
  );
}
