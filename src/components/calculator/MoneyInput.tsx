interface MoneyInputProps {
  label: string;
  placeholder?: string;
}

export function MoneyInput({ label, placeholder = "0.00" }: MoneyInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-gray-600">{label}</label>
      <div className="flex items-center gap-1.5 px-4 py-3 bg-white border border-gray-200 rounded-xl focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100 transition-all">
        <span className="text-gray-400 text-base select-none">$</span>
        <input
          type="number"
          placeholder={placeholder}
          className="flex-1 outline-none text-base text-gray-900 placeholder-gray-300 bg-transparent min-w-0"
        />
      </div>
    </div>
  );
}
