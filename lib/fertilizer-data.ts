export interface FertilizerDetails {
  slug: string;
  name: string;
  npk: string;
  npkArray: [number, number, number];
  solubility: number; // g/L
  solubilityTemp: number; // °C
  description: string;
  crops: string[];
  compatibilityWarnings: string[];
  relatedSlugs: string[];
  id: string; // matches id in fertilizers.json
}

export const FERTILIZERS: FertilizerDetails[] = [
  {
    slug: "urea-46-0-0",
    name: "Urea",
    npk: "46-0-0",
    npkArray: [46, 0, 0],
    solubility: 1079,
    solubilityTemp: 20,
    description: "Urea is the most concentrated solid nitrogen fertilizer, widely used in agriculture and turf applications for fast, economic green-up and vegetative growth.",
    crops: ["Turf Grass", "Wheat", "Maize (Corn)", "Sugarcane", "Rice"],
    compatibilityWarnings: [
      "Avoid mixing with highly acidic fertilizers in concentrate to prevent heat generation.",
      "Do not apply on wet leaves to avoid burning.",
      "Avoid application in direct sunlight or dry soils to reduce nitrogen volatilization loss."
    ],
    relatedSlugs: ["ammonium-nitrate-34-0-0", "ammonium-sulfate-21-0-0", "calcium-nitrate-15-5-0-0"],
    id: "66"
  },
  {
    slug: "calcium-nitrate-15-5-0-0",
    name: "Calcium Nitrate",
    npk: "15.5-0-0",
    npkArray: [15.5, 0, 0],
    solubility: 1200,
    solubilityTemp: 20,
    description: "Calcium Nitrate is a highly soluble fertilizer providing fast-acting nitrate nitrogen and essential calcium, ideal for greenhouse crops, tomatoes, and hydroponic systems.",
    crops: ["Hydroponic Tomato", "Pepper", "Lettuce", "Strawberry", "Bermudagrass"],
    compatibilityWarnings: [
      "CRITICAL: Never mix Calcium Nitrate with Sulfates (like Magnesium Sulfate or Potassium Sulfate) in a concentrated stock tank to prevent Gypsum precipitation.",
      "Do not mix with concentrated Phosphate solutions (like MAP or DAP) in the same stock tank."
    ],
    relatedSlugs: ["potassium-nitrate-13-0-46", "magnesium-sulfate-epsom", "ammonium-nitrate-34-0-0"],
    id: "903"
  },
  {
    slug: "dap-18-46-0",
    name: "Diammonium Phosphate (DAP)",
    npk: "18-46-0",
    npkArray: [18, 46, 0],
    solubility: 588,
    solubilityTemp: 20,
    description: "Diammonium Phosphate is the world's most widely used phosphorus fertilizer, combining high phosphorus content with ammoniacal nitrogen for initial root development.",
    crops: ["Wheat", "Maize (Corn)", "Rice", "Soybean", "Potato"],
    compatibilityWarnings: [
      "Do not mix with calcium-based fertilizers in concentrated solution to avoid calcium phosphate fallout.",
      "Avoid applying in direct contact with seeds due to potential ammonia release injury."
    ],
    relatedSlugs: ["map-12-61-0", "mop-0-0-60", "potassium-sulfate-0-0-50"],
    id: "203"
  },
  {
    slug: "mop-0-0-60",
    name: "Muriate of Potash (MOP)",
    npk: "0-0-60",
    npkArray: [0, 0, 60],
    solubility: 344,
    solubilityTemp: 20,
    description: "Muriate of Potash (Potassium Chloride) is the most abundant and cost-effective potassium source for field crops, enhancing drought resistance and stem strength.",
    crops: ["Wheat", "Maize (Corn)", "Sugarcane", "Rice", "Cotton"],
    compatibilityWarnings: [
      "Contains high chloride (Cl-); do not use in hydroponic reservoirs or for chloride-sensitive crops like tobacco, berries, or avocados.",
      "High salt index; avoid concentrated seed placement."
    ],
    relatedSlugs: ["potassium-sulfate-0-0-50", "dap-18-46-0", "potassium-nitrate-13-0-46"],
    id: "428"
  },
  {
    slug: "potassium-sulfate-0-0-50",
    name: "Potassium Sulfate (SOP)",
    npk: "0-0-50",
    npkArray: [0, 0, 50],
    solubility: 111,
    solubilityTemp: 20,
    description: "Potassium Sulfate (Sulfate of Potash) is a premium, chloride-free potassium source that also supplies essential sulfur, ideal for high-value sensitive crops.",
    crops: ["Potato", "Hydroponic Tomato", "Bluegrass", "Strawberry", "Cotton"],
    compatibilityWarnings: [
      "Do not mix with Calcium Nitrate in concentrated stock solutions; will cause calcium sulfate (gypsum) precipitation.",
      "Has relatively low solubility; do not over-concentrate in mixing tanks."
    ],
    relatedSlugs: ["mop-0-0-60", "potassium-nitrate-13-0-46", "magnesium-sulfate-epsom"],
    id: "463"
  },
  {
    slug: "ammonium-nitrate-34-0-0",
    name: "Ammonium Nitrate",
    npk: "34-0-0",
    npkArray: [34, 0, 0],
    solubility: 1900,
    solubilityTemp: 20,
    description: "Ammonium Nitrate is a highly soluble dry fertilizer providing equal parts fast-acting nitrate and sustained-release ammonium nitrogen for active crop growth.",
    crops: ["Turf Grass", "Wheat", "Maize (Corn)", "Barley", "Bermudagrass"],
    compatibilityWarnings: [
      "Highly hygroscopic; stores poorly in humid environments.",
      "Oxidizing agent; keep away from organic compounds, fuels, and heat sources."
    ],
    relatedSlugs: ["urea-46-0-0", "ammonium-sulfate-21-0-0", "calcium-nitrate-15-5-0-0"],
    id: "10"
  },
  {
    slug: "ammonium-sulfate-21-0-0",
    name: "Ammonium Sulfate",
    npk: "21-0-0",
    npkArray: [21, 0, 0],
    solubility: 754,
    solubilityTemp: 20,
    description: "Ammonium Sulfate supplies fast-acting ammoniacal nitrogen and a rich source of plant-available sulfur, excellent for acidifying alkaline soils.",
    crops: ["Rice", "Potato", "Turf Grass", "Bluegrass", "Soybean"],
    compatibilityWarnings: [
      "Acidifying action will lower soil pH over time; monitor soil acidity levels.",
      "Do not mix with calcium-based solutions in concentrated stock tanks."
    ],
    relatedSlugs: ["urea-46-0-0", "ammonium-nitrate-34-0-0", "potassium-sulfate-0-0-50"],
    id: "24"
  },
  {
    slug: "map-12-61-0",
    name: "Mono Ammonium Phosphate (MAP)",
    npk: "12-61-0",
    npkArray: [12, 61, 0],
    solubility: 370,
    solubilityTemp: 20,
    description: "Mono Ammonium Phosphate 12-61-0 is a high-analysis, highly soluble phosphorus starter fertilizer ideal for fertigation and root development in young seedlings.",
    crops: ["Hydroponic Tomato", "Maize (Corn)", "Potato", "Lettuce", "Pepper"],
    compatibilityWarnings: [
      "Do not mix with Calcium Nitrate or other calcium inputs in concentrated tanks to prevent calcium phosphate precipitation.",
      "Slightly acidic; check solution pH when mixing in large quantities."
    ],
    relatedSlugs: ["dap-18-46-0", "potassium-nitrate-13-0-46", "magnesium-sulfate-epsom"],
    id: "901"
  },
  {
    slug: "potassium-nitrate-13-0-46",
    name: "Potassium Nitrate",
    npk: "13-0-46",
    npkArray: [13, 0, 46],
    solubility: 316,
    solubilityTemp: 20,
    description: "Potassium Nitrate (KNO3) is a highly soluble fertilizer providing dual macronutrients (Nitrogen & Potassium), essential for fruit sizing, bloom quality, and disease resistance.",
    crops: ["Hydroponic Tomato", "Pepper", "Potato", "Strawberry", "Sugarcane"],
    compatibilityWarnings: [
      "Highly soluble, but solution cools significantly when dissolved. Warm water helps speed up the process.",
      "Avoid mixing with high concentrations of phosphate in hard water to prevent cloudiness."
    ],
    relatedSlugs: ["potassium-sulfate-0-0-50", "calcium-nitrate-15-5-0-0", "magnesium-sulfate-epsom"],
    id: "904"
  },
  {
    slug: "magnesium-sulfate-epsom",
    name: "Magnesium Sulfate (Epsom Salt)",
    npk: "0-0-0",
    npkArray: [0, 0, 0],
    solubility: 710,
    solubilityTemp: 20,
    description: "Magnesium Sulfate (Epsom Salt) is a highly soluble mineral compound that corrects magnesium and sulfur deficiencies, promoting chlorophyll synthesis and photosynthesis.",
    crops: ["Hydroponic Tomato", "Pepper", "Lawn", "Bermudagrass", "Bluegrass"],
    compatibilityWarnings: [
      "CRITICAL: Never mix Magnesium Sulfate with Calcium Nitrate in concentrated stock tanks; doing so immediately forms insoluble Calcium Sulfate (Gypsum).",
      "Keep concentrated solutions separate from calcium solutions in two-tank A/B systems."
    ],
    relatedSlugs: ["calcium-nitrate-15-5-0-0", "potassium-sulfate-0-0-50", "potassium-nitrate-13-0-46"],
    id: "902"
  }
];

export function getFertilizerBySlug(slug: string): FertilizerDetails | undefined {
  return FERTILIZERS.find((f) => f.slug === slug);
}
