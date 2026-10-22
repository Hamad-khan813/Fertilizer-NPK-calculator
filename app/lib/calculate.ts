// ============================================================
// NPK Fertilizer Calculator — Core Logic
// Note: P values in dataset are expressed as P2O5 (%)
//       K values in dataset are expressed as K2O (%)
//       This matches standard agronomic convention.
// ============================================================

export interface Fertilizer {
  id: string;
  name: string;
  code: string;      // e.g. "46-0-0"
  N: number;         // % elemental nitrogen
  P: number;         // % P2O5 (phosphorus pentoxide)
  K: number;         // % K2O (potassium oxide)
  form: "granular" | "liquid";
  category: "nitrogen" | "phosphorus" | "potassium" | "compound" | "micronutrient";
  p_unit: "P2O5";
  k_unit: "K2O";
  notes?: string;
}

export interface CalcInput {
  targetN: number;   // target nutrient percentage by volume (% w/v)
  targetP: number;   // target P2O5 percentage by volume (% w/v)
  targetK: number;   // target K2O percentage by volume (% w/v)
  volumeLitres: number;
  fertilizer: Fertilizer;
}

export interface CalcResult {
  amountG: number;           // grams (or ml for liquids — density ~1 g/ml assumed)
  actualN: number;           // % N delivered
  actualP: number;           // % P2O5 delivered
  actualK: number;           // % K2O delivered
  limitingNutrient: "N" | "P" | "K" | null;
  warning: string | null;
}

export const P2O5_TO_ELEMENTAL_P = 0.4364;
export const K2O_TO_ELEMENTAL_K = 0.8302;

export function convertP2O5ToElementalP(p2o5: number): number {
  return p2o5 * P2O5_TO_ELEMENTAL_P;
}

export function convertK2OToElementalK(k2o: number): number {
  return k2o * K2O_TO_ELEMENTAL_K;
}

/**
 * Calculate how much fertilizer is needed to hit the target NPK.
 * Uses the binding (most limiting) nutrient as the constraint.
 *
 * Targets and delivered values are percentages by volume (% w/v).
 * Formula: amount_g = (target% / fertilizer nutrient%) * volume_L * 1000
 * The factor 1000 converts the target fraction into grams per litre.
 */
export function calcAmount(input: CalcInput): CalcResult {
  const { targetN, targetP, targetK, volumeLitres, fertilizer } = input;

  const candidates: Array<{ nutrient: "N" | "P" | "K"; amount: number }> = [];

  // Only consider nutrients that are both requested AND present in fertilizer
  if (targetN > 0 && fertilizer.N > 0) {
    candidates.push({ nutrient: "N", amount: (targetN / fertilizer.N) * volumeLitres * 1000 });
  }
  if (targetP > 0 && fertilizer.P > 0) {
    candidates.push({ nutrient: "P", amount: (targetP / fertilizer.P) * volumeLitres * 1000 });
  }
  if (targetK > 0 && fertilizer.K > 0) {
    candidates.push({ nutrient: "K", amount: (targetK / fertilizer.K) * volumeLitres * 1000 });
  }

  // Edge case: no matching nutrients
  if (candidates.length === 0) {
    return {
      amountG: 0,
      actualN: 0,
      actualP: 0,
      actualK: 0,
      limitingNutrient: null,
      warning: `${fertilizer.name} contains none of the target nutrients. Choose a different fertilizer.`,
    };
  }

  // The binding constraint is the nutrient requiring the MOST fertilizer
  const binding = candidates.reduce((a, b) => (a.amount >= b.amount ? a : b));
  const amountG = Math.round(binding.amount * 100) / 100;

  // Calculate what we actually deliver at this application rate
  const actualN = parseFloat(((amountG * fertilizer.N) / (volumeLitres * 1000)).toFixed(3));
  const actualP = parseFloat(((amountG * fertilizer.P) / (volumeLitres * 1000)).toFixed(3));
  const actualK = parseFloat(((amountG * fertilizer.K) / (volumeLitres * 1000)).toFixed(3));

  // Warn if fertilizer cannot satisfy a requested nutrient
  const missingNutrients: string[] = [];
  if (targetN > 0 && fertilizer.N === 0) missingNutrients.push("N");
  if (targetP > 0 && fertilizer.P === 0) missingNutrients.push("P₂O₅");
  if (targetK > 0 && fertilizer.K === 0) missingNutrients.push("K₂O");

  const warning =
    missingNutrients.length > 0
      ? `${fertilizer.name} cannot supply: ${missingNutrients.join(", ")}. Consider blending with another fertilizer.`
      : null;

  return {
    amountG,
    actualN,
    actualP,
    actualK,
    limitingNutrient: binding.nutrient,
    warning,
  };
}

/**
 * Calculate actual NPK delivered for a given application amount.
 * Useful when the user knows how much they're applying and wants to
 * see what NPK that translates to.
 */
export function calcDelivered(
  amountG: number,
  fertilizer: Fertilizer,
  volumeLitres: number
): { actualN: number; actualP: number; actualK: number } {
  if (volumeLitres <= 0) throw new Error("Volume must be greater than 0");
  const base = amountG / (volumeLitres * 1000);
  return {
    actualN: parseFloat((base * fertilizer.N).toFixed(3)),
    actualP: parseFloat((base * fertilizer.P).toFixed(3)),
    actualK: parseFloat((base * fertilizer.K).toFixed(3)),
  };
}
