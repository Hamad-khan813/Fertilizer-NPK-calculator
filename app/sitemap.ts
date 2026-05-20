import { MetadataRoute } from 'next';

const cropUnitCombinations = [
  { cropType: "turf-grass",         unit: "lbs"    },
  { cropType: "hydroponic-tomato",  unit: "grams"  },
  { cropType: "wheat",              unit: "kg"     },
  { cropType: "sugarcane",          unit: "kg"     },
  { cropType: "rice",               unit: "kg"     },
  { cropType: "maize",              unit: "kg"     },
  { cropType: "lawn-grass",         unit: "lbs"    },
  { cropType: "indoor-cannabis",    unit: "grams"  },
  { cropType: "vegetable-garden",   unit: "oz"     },
  { cropType: "cotton",             unit: "kg"     },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ferti-calc.vercel.app';
  
  const baseSitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/what-is-npk`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/what-is-npk`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/guides/foliar-spray-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/guides/ppm-conversion`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/guides/hydroponic-nutrients`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const dynamicSitemap = cropUnitCombinations.map(({ cropType, unit }) => ({
    url: `${baseUrl}/calculator/${cropType}/${unit}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...baseSitemap, ...dynamicSitemap];
}
