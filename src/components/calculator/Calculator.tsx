import { useState } from "react";
import { MoneyInput } from "./MoneyInput";
import { MoneyDisplay } from "./MoneyDisplay";
import { PercentInput } from "./PercentInput";
import { SelectField } from "./SelectField";
import { TotalRow } from "./TotalRow";
import { calculateRetentionValues } from "./calculateRetentionValues";

// Intermediate values: 2 decimal places
const fmt = (n: number) => n.toFixed(2);

// valorPago: preserve full precision, no automatic rounding
const fmtPago = (n: number): string => {
  if (n === 0) return "0.00";
  const str = parseFloat(n.toFixed(4)).toString();
  if (!str.includes(".")) return str + ".00";
  const decimals = str.split(".")[1];
  return decimals.length < 2 ? str + "0".repeat(2 - decimals.length) : str;
};

export function Calculator() {
  const [subtotal, setSubtotal] = useState("");
  const [ivaPercent, setIvaPercent] = useState("15");
  const [discountPercent, setDiscountPercent] = useState("");
  const [retIVAPercent, setRetIVAPercent] = useState("30");
  const [retIRPercent, setRetIRPercent] = useState("2");

  const parsedSubtotal = Math.max(0, parseFloat(subtotal) || 0);
  const parsedDiscount = Math.min(100, Math.max(0, parseInt(discountPercent) || 0));

  const results = calculateRetentionValues({
    subtotalOriginal: parsedSubtotal,
    ivaPercent: parseFloat(ivaPercent),
    discountPercent: parsedDiscount,
    retIVAPercent: parseFloat(retIVAPercent),
    retIRPercent: parseFloat(retIRPercent),
  });

  const hasDiscount = parsedDiscount > 0;

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6">
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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md px-6 pt-5 pb-5 flex flex-col gap-4">
          <span className="text-xs font-semibold text-primary-500 uppercase tracking-widest">
            Factura
          </span>

          <MoneyInput
            label="Subtotal"
            value={subtotal}
            onChange={setSubtotal}
          />

          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="IVA"
              options={[
                { label: "15%", value: "15" },
                { label: "12%", value: "12" },
              ]}
              value={ivaPercent}
              onChange={setIvaPercent}
            />
            <MoneyDisplay label="Valor IVA" value={fmt(results.valorIVA)} />
          </div>

          <PercentInput
            label="Descuento"
            max={100}
            value={discountPercent}
            onChange={setDiscountPercent}
          />

          {/* Desglose de factura */}
          <div className="bg-primary-50 rounded-xl px-5 pt-4 pb-4 flex flex-col gap-3">
            <TotalRow label="Subtotal" value={fmt(parsedSubtotal)} muted />

            {hasDiscount && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-400">
                    Descuento ({parsedDiscount}%)
                  </span>
                  <span className="text-sm tabular-nums text-primary-400">
                    -${fmt(results.valorDescuento)}
                  </span>
                </div>
                <TotalRow
                  label="Subtotal oficial"
                  value={fmt(results.subtotalOficial)}
                  muted
                />
              </>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-primary-400">IVA ({ivaPercent}%)</span>
              <span className="text-sm tabular-nums text-primary-400">
                ${fmt(results.valorIVA)}
              </span>
            </div>

            <hr className="border-primary-200" />
            <TotalRow label="Total factura" value={fmt(results.totalFactura)} />
          </div>
        </div>

        {/* Card 2: Retenciones */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-md px-6 pt-5 pb-5 flex flex-col gap-4">
          <span className="text-xs font-semibold text-primary-500 uppercase tracking-widest">
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
              value={retIVAPercent}
              onChange={setRetIVAPercent}
            />
            <MoneyDisplay
              label="Valor ret. IVA"
              value={fmt(results.valorRetencionIVA)}
            />
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
              value={retIRPercent}
              onChange={setRetIRPercent}
            />
            <MoneyDisplay
              label="Valor ret. IR"
              value={fmt(results.valorRetencionIR)}
            />
          </div>

          <div className="bg-primary-50 rounded-xl px-5 pt-4 pb-4 flex flex-col gap-3">
            <TotalRow
              label="Total retención"
              value={fmt(results.totalRetencion)}
              muted
            />
            <hr className="border-primary-200" />
            <TotalRow label="Valor a pagar" value={fmtPago(results.valorPago)} />
          </div>
        </div>
      </main>
    </div>
  );
}
