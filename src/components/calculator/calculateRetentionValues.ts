export interface CalculatorInputs {
  subtotalOriginal: number;
  ivaPercent: number;
  discountPercent: number;
  retIVAPercent: number;
  retIRPercent: number;
}

export interface CalculatorResults {
  valorDescuento: number;
  subtotalOficial: number;
  valorIVA: number;
  totalFactura: number;
  valorRetencionIVA: number;
  valorRetencionIR: number;
  totalRetencion: number;
  valorPago: number;
}

export function calculateRetentionValues(inputs: CalculatorInputs): CalculatorResults {
  const { subtotalOriginal, ivaPercent, discountPercent, retIVAPercent, retIRPercent } = inputs;

  const valorDescuento = discountPercent > 0 ? subtotalOriginal * discountPercent / 100 : 0;
  const subtotalOficial = subtotalOriginal - valorDescuento;
  const valorIVA = subtotalOficial * ivaPercent / 100;
  const totalFactura = subtotalOficial + valorIVA;
  const valorRetencionIVA = valorIVA * retIVAPercent / 100;
  const valorRetencionIR = subtotalOficial * retIRPercent / 100;
  const totalRetencion = valorRetencionIVA + valorRetencionIR;
  const valorPago = totalFactura - totalRetencion;

  return {
    valorDescuento,
    subtotalOficial,
    valorIVA,
    totalFactura,
    valorRetencionIVA,
    valorRetencionIR,
    totalRetencion,
    valorPago,
  };
}
