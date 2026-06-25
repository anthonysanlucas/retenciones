interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  options: Option[];
  defaultValue?: string;
}

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function SelectField({ label, options, defaultValue }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-gray-600">{label}</label>
      <div className="relative">
        <select
          defaultValue={defaultValue ?? options[0]?.value}
          className="w-full appearance-none px-4 py-3 pr-10 bg-white border border-gray-200 rounded-xl text-base text-gray-900 outline-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown />
        </span>
      </div>
    </div>
  );
}
