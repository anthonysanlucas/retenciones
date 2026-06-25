import { MoneyInput } from "./MoneyInput";
import { MoneyDisplay } from "./MoneyDisplay";
import { SelectField } from "./SelectField";
import { TotalRow } from "./TotalRow";
import { SummaryDisplay } from "./SummaryDisplay";

export function Calculator() {
  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6">
      {/* Page header */}
      <header className="max-w-xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          Calculadora de retenciones
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Persona natural o jurídica obligadas a llevar contabilidad
        </p>
      </header>

      <main className="max-w-xl mx-auto flex flex-col gap-4">
        {/* Card 1: Factura */}
        <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex flex-col gap-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Factura
          </span>

          <MoneyInput label="Subtotal" />

          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="IVA"
              options={[
                { label: "15%", value: "15" },
                { label: "12%", value: "12" },
              ]}
              defaultValue="15"
            />
            <MoneyDisplay label="Valor IVA" />
          </div>

          <div className="border-t border-gray-100 pt-4">
            <TotalRow label="Total factura" />
          </div>
        </div>

        {/* Card 2: Retenciones */}
        <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex flex-col gap-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Retenciones
          </span>

          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="Ret. IVA"
              options={[
                { label: "30%", value: "30" },
                { label: "70%", value: "70" },
                { label: "100%", value: "100" },
              ]}
              defaultValue="30"
            />
            <MoneyDisplay label="Valor ret. IVA" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="Ret. IR"
              options={[
                { label: "2.75%", value: "2.75" },
                { label: "2%", value: "2" },
                { label: "1.75%", value: "1.75" },
                { label: "1%", value: "1" },
              ]}
              defaultValue="2.75"
            />
            <MoneyDisplay label="Valor ret. IR" />
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4">
          <SummaryDisplay label="Total retención" />
          <SummaryDisplay label="Valor a pagar" />
        </div>
      </main>
    </div>
  );
}
