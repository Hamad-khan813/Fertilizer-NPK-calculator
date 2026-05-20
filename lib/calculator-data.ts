export interface Crop {
  slug: string;
  label: string;
  category: string;
}

export interface Unit {
  slug: string;
  label: string;
  system: 'metric' | 'imperial';
}

export const CROPS: Crop[] = [
  { slug: 'tomato',        label: 'Tomato',         category: 'vegetable'  },
  { slug: 'corn',          label: 'Corn',            category: 'grain'      },
  { slug: 'wheat',         label: 'Wheat',           category: 'grain'      },
  { slug: 'potato',        label: 'Potato',          category: 'vegetable'  },
  { slug: 'bermudagrass',  label: 'Bermuda Grass',   category: 'turf'       },
  { slug: 'bluegrass',     label: 'Blue Grass',      category: 'turf'       },
  { slug: 'soybean',       label: 'Soybean',         category: 'legume'     },
  { slug: 'rice',          label: 'Rice',            category: 'grain'      },
  { slug: 'cotton',        label: 'Cotton',          category: 'cash-crop'  },
  { slug: 'barley',        label: 'Barley',          category: 'grain'      },
  { slug: 'sugarcane',     label: 'Sugarcane',       category: 'cash-crop'  },
  { slug: 'hydroponic-tomato', label: 'Hydroponic Tomato', category: 'indoor' },
  { slug: 'turf-grass',    label: 'Turf Grass',      category: 'turf'       },
  { slug: 'maize',         label: 'Maize',           category: 'grain'      },
];

export const UNITS: Unit[] = [
  { slug: 'kg',     label: 'Kilograms', system: 'metric'   },
  { slug: 'lbs',    label: 'Pounds',    system: 'imperial' },
  { slug: 'grams',  label: 'Grams',     system: 'metric'   },
  { slug: 'ounces', label: 'Ounces',    system: 'imperial' },
];

export const BASE_URL = 'https://ferti-calc.vercel.app';

export interface Combination {
  crop: string;
  unit: string;
  cropLabel: string;
  unitLabel: string;
  category: string;
  url: string;
}

// Helper — generates all combinations as a flat array
export const getAllCombinations = (): Combination[] =>
  CROPS.flatMap((crop) =>
    UNITS.map((unit) => ({
      crop: crop.slug,
      unit: unit.slug,
      cropLabel: crop.label,
      unitLabel: unit.label,
      category: crop.category,
      url: `${BASE_URL}/calculator/${crop.slug}/${unit.slug}`
    }))
  );
