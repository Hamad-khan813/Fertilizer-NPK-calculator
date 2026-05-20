export type UseCase = 'turf' | 'hydroponics' | 'agriculture' | 'general';

export const ENTITY_MAP: Record<UseCase, { entities: string[], schemaType: string, contextContent: string, shortName: string }> = {
  turf: {
    shortName: 'Residential Lawn',
    entities: ["Cool-season grasses", "Rhizomes", "Cation-Exchange Capacity (CEC)", "Thatch"],
    schemaType: "WebPage",
    contextContent: "Optimizing Cation-Exchange Capacity (CEC) prevents fertilizer leaching through the thatch layer in cool-season grasses. Perfect your lawn care routine with precise NPK spreader calculations."
  },
  hydroponics: {
    shortName: 'Indoor Hydroponics',
    entities: ["Hydroponics", "Liquid Nutrient Solution", "Substrate", "Electrical Conductivity (EC)"],
    schemaType: "ItemPage",
    contextContent: "Maintaining accurate Electrical Conductivity (EC) in your liquid nutrient solution prevents root burn across all inert substrates. Master indoor smart gardens."
  },
  agriculture: {
    shortName: 'Crop Production',
    entities: ["Macro-nutrients", "Leaching", "Volatilization", "4R Nutrient Stewardship"],
    schemaType: "Article",
    contextContent: "Applying the 4R Nutrient Stewardship framework reduces nitrogen volatilization and minimizes groundwater leaching for high-yield agriculture."
  },
  general: {
    shortName: 'General Application',
    entities: ["NPK", "Soil Amendment", "Fertilizer Blending", "Agronomy"],
    schemaType: "WebApplication",
    contextContent: "Professional agronomical fertilizer blending ensures optimal soil amendment and crop yields globally."
  }
};

export function generateMarkdownReport(
  result: { amountG: number, actualN: number, actualP: number, actualK: number } | null, 
  inputs: { targetN: number, targetP: number, targetK: number } | null, 
  system: 'metric' | 'imperial',
  isLiquid: boolean,
  useCase: UseCase
) {
  if (!result || !inputs) return '';

  const dryUnit = system === 'metric' ? 'grams' : 'ounces';
  const liqUnit = system === 'metric' ? 'ml' : 'fl oz';
  const unit = isLiquid ? liqUnit : dryUnit;

  const context = ENTITY_MAP[useCase].shortName;
  const url = `https://ferti-calc.vercel.app/?n=${inputs.targetN}&p=${inputs.targetP}&k=${inputs.targetK}&useCase=${useCase}`;

  return `### My ${context} Custom NPK Recipe
- **Target Ratio:** ${inputs.targetN}-${inputs.targetP}-${inputs.targetK}
- **Required Application:** ${result.amountG} ${unit}

> *Calculated using precise elemental-to-oxide agronomical conversions via [FertiCalc](${url}). Ensures optimal 4R Nutrient Stewardship without manual spreadsheet math.*`;
}
