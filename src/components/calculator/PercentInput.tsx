interface PercentInputProps {
  label: string;
  placeholder?: string;
  max?: number;
  value: string;
  onChange: (value: string) => void;
}

export function PercentInput({ label, placeholder = "0", max = 100, value, onChange }: PercentInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-1.5 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all">
        <input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={0}
          max={max}
          step={1}
          className="flex-1 outline-none text-base font-medium text-gray-900 placeholder:text-gray-300 bg-transparent min-w-0"
        />
        <span className="text-gray-400 text-base font-medium select-none">%</span>
      </div>
    </div>
  );
}
