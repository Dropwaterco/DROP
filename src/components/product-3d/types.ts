export type ProductTheme = 'dark' | 'light';

export type Product3DConfig = {
  id: 'original' | 'mint' | 'athlete' | 'clove';
  name: string;
  index: string;
  headline: string;
  description: string;
  accent: string;
  background: string;
  theme: ProductTheme;
  capacity: string;
  modelUrl: string;
  modelReady: boolean;
  fallbackImage: string;
  modelScale: number;
  modelPositionY: number;
};
