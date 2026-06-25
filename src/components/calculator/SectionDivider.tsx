export function SectionDivider() {
  return (
    <div className="flex items-center gap-4 px-8">
      <div className="flex-1 h-px bg-gray-100" />
      <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest whitespace-nowrap">
        Detalle de retención
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}
