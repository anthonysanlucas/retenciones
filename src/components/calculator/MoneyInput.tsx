interface MoneyInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function MoneyInput({ label, placeholder = "0.00", value, onChange }: MoneyInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-gray-600">{label}</label>
      <div className="flex items-center gap-1.5 px-4 py-3 bg-white border border-gray-200 rounded-xl focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
        <span className="text-gray-400 text-base select-none">$</span>
        <input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={0}
          className="flex-1 outline-none text-base text-gray-900 placeholder-gray-300 bg-transparent min-w-0"
        />
      </div>
    </div>
  );
}
