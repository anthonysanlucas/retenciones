interface PercentInputProps {
  label: string;
  placeholder?: string;
  max?: number;
}

export function PercentInput({ label, placeholder = "0", max = 99 }: PercentInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-gray-600">{label}</label>
      <div className="flex items-center gap-1.5 px-4 py-3 bg-white border border-gray-200 rounded-xl focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
        <input
          type="number"
          placeholder={placeholder}
          min={0}
          max={max}
          className="flex-1 outline-none text-base text-gray-900 placeholder-gray-300 bg-transparent min-w-0"
        />
        <span className="text-gray-400 text-base select-none">%</span>
      </div>
    </div>
  );
}
