export type ProductStatus = 'available' | 'preorder' | 'coming-soon';

export type Product = {
  id: string;
  slug: string;
  displayName: string;
  variantName?: string;
  waterType: string;
  flavour?: string;
  availableSizes: string[];
  colourName: string;
  description: string;
  designedFor?: string;
  status: ProductStatus;
  price?: number;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'still-water',
    slug: 'still-water',
    displayName: 'DROP Still Water',
    variantName: 'Pure Silver',
    waterType: 'Still Water',
    flavour: 'None',
    availableSizes: ['330ml', '500ml'],
    colourName: 'Silver',
    description: 'Pure, crisp still water in a premium recyclable aluminium can. The standard for everyday hydration.',
    designedFor: 'Everyday Hydration',
    status: 'coming-soon',
    image: '/assets/new-can-2.png',
  },
  {
    id: 'mint',
    slug: 'mint-water',
    displayName: 'DROP Mint Water',
    variantName: 'Deep Purple',
    waterType: 'Still Water',
    flavour: 'Mint',
    availableSizes: ['330ml', '500ml'],
    colourName: 'Purple',
    description: 'Crisp, cooling mint infusion crafted to refresh and reset.',
    designedFor: 'Recovery & Focus',
    status: 'preorder',
    image: '/assets/new-can-variant-1.png',
  },
  {
    id: 'athlete',
    slug: 'athlete-water',
    displayName: 'DROP Athlete Edition',
    variantName: 'Full Black',
    waterType: 'Still Water',
    flavour: 'Trace Minerals',
    availableSizes: ['330ml', '500ml'],
    colourName: 'Black',
    description: 'Zero-compromise performance hydration with elevated electrolytes.',
    designedFor: 'High-intensity Training',
    status: 'available',
    image: '/assets/black_can_raw.png',
  },
  {
    id: 'clove',
    slug: 'clove-water',
    displayName: 'DROP Clove Water',
    variantName: 'Blood Red',
    waterType: 'Still Water',
    flavour: 'Clove',
    availableSizes: ['330ml', '500ml'],
    colourName: 'Red',
    description: 'Infused with aromatic clove extracts to restore natural vitality.',
    designedFor: 'Vitality & Digestion',
    status: 'coming-soon',
    image: '/assets/clove_can_transparent_fixed.png',
  }
];
