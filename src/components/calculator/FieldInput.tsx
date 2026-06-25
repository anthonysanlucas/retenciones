interface FieldInputProps {
  label: string;
  placeholder?: string;
  readOnly?: boolean;
}

export function FieldInput({ label, placeholder = "0.00", readOnly = false }: FieldInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      <input
        type="number"
        placeholder={placeholder}
        readOnly={readOnly}
        className={[
          "w-full px-4 py-3 rounded-xl text-base text-gray-900 placeholder-gray-300",
          "border outline-none transition-all duration-150",
          readOnly
            ? "bg-gray-50 border-gray-100 text-gray-500 cursor-default select-none"
            : "bg-white border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100",
        ].join(" ")}
      />
    </div>
  );
}
