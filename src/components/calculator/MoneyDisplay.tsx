interface MoneyDisplayProps {
  label: string;
  value?: string;
}

export function MoneyDisplay({ label, value = "0.00" }: MoneyDisplayProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-gray-600">{label}</label>
      <div className="flex items-center gap-1.5 px-4 py-3 bg-primary-100 border border-primary-200 rounded-xl">
        <span className="text-primary-400 text-base select-none">$</span>
        <span className="flex-1 text-base text-primary-600">{value}</span>
      </div>
    </div>
  );
}
