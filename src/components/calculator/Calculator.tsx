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

  const hasSubtotal = subtotal.trim() !== "" && parsedSubtotal > 0;
  const hasDiscount = parsedDiscount > 0;

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6">
      <header className="max-w-xl mx-auto mb-8 text-center">        
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
          Calculadora de retenciones
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Personas naturales y jurídicas obligadas a llevar contabilidad
        </p>
      </header>

      <main className="max-w-xl mx-auto flex flex-col gap-5">
        {/* Card 1: Factura */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs px-6 pt-5 pb-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">            
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Datos de la factura
            </span>
          </div>

          <MoneyInput
            label="Subtotal"
            value={subtotal}
            onChange={setSubtotal}
          />

          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="Tarifa IVA"
              options={[
                { label: "15%", value: "15" },
                { label: "12%", value: "12" },
              ]}
              value={ivaPercent}
              onChange={setIvaPercent}
            />
            <MoneyDisplay
              label="Valor IVA"
              value={hasSubtotal ? fmt(results.valorIVA) : "-"}
            />
          </div>

          <PercentInput
            label="Descuento"
            max={100}
            value={discountPercent}
            onChange={setDiscountPercent}
          />

          {/* Desglose de factura */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/70 flex flex-col gap-2">
            <TotalRow
              label="Subtotal"
              value={hasSubtotal ? fmt(parsedSubtotal) : "-"}
              muted
            />

            {hasDiscount && (
              <>
                <TotalRow
                  label={`Descuento (${parsedDiscount}%)`}
                  value={hasSubtotal ? fmt(results.valorDescuento) : "-"}
                  prefix="-$"
                  muted
                />
                <TotalRow
                  label="Subtotal oficial"
                  value={hasSubtotal ? fmt(results.subtotalOficial) : "-"}
                  muted
                />
              </>
            )}

            <TotalRow
              label={`IVA (${ivaPercent}%)`}
              value={hasSubtotal ? fmt(results.valorIVA) : "-"}
              prefix="+$"
              muted
            />

            <hr className="border-stone-200 my-1" />
            <TotalRow
              label="Total factura"
              value={hasSubtotal ? fmt(results.totalFactura) : "-"}
            />
          </div>
        </div>

        {/* Card 2: Retenciones */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs px-6 pt-5 pb-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">            
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Retenciones aplicables
            </span>
          </div>

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
              value={hasSubtotal ? fmt(results.valorRetencionIVA) : "-"}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="Ret. IR"
              options={[
                { label: "2%", value: "2" },
                { label: "2.75%", value: "2.75" },
                { label: "1.75%", value: "1.75" },
                { label: "1%", value: "1" },
              ]}
              value={retIRPercent}
              onChange={setRetIRPercent}
            />
            <MoneyDisplay
              label="Valor ret. IR"
              value={hasSubtotal ? fmt(results.valorRetencionIR) : "-"}
            />
          </div>

          {/* Desglose de retenciones */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/70 flex flex-col gap-2">
            <TotalRow
              label={`Retención IVA (${retIVAPercent}%)`}
              value={hasSubtotal ? fmt(results.valorRetencionIVA) : "-"}
              prefix="-$"
              muted
            />
            <TotalRow
              label={`Retención IR (${retIRPercent}%)`}
              value={hasSubtotal ? fmt(results.valorRetencionIR) : "-"}
              prefix="-$"
              muted
            />
            <hr className="border-stone-200 my-1" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Total retención</span>
              <span className={`text-base font-bold tabular-nums ${hasSubtotal ? "text-gray-900" : "text-gray-400"}`}>
                {hasSubtotal ? `-$${fmt(results.totalRetencion)}` : "-"}
              </span>
            </div>
          </div>

          {/* Resultado definitivo: Valor a pagar */}
          <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-200">
                Valor a pagar
              </span>
              <p className="text-xs text-primary-300 mt-0.5">
                Total factura menos retenciones aplicadas
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className={`text-3xl font-extrabold tracking-tight tabular-nums ${hasSubtotal ? "text-white" : "text-primary-300"}`}>
                {hasSubtotal ? `$${fmtPago(results.valorPago)}` : "-"}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
