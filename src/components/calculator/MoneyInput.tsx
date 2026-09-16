interface MoneyInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function MoneyInput({ label, placeholder = "0.00", value, onChange }: MoneyInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all">
        <span className="text-gray-400 text-base font-medium select-none">$</span>
        <input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={0}
          step="any"
          className="flex-1 outline-none text-base font-medium text-gray-900 placeholder:text-gray-300 bg-transparent min-w-0"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-gray-400 hover:text-gray-600 p-1 -mr-1 rounded-lg hover:bg-gray-100 text-xs transition-colors"
            title="Borrar"
            aria-label="Borrar subtotal"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
