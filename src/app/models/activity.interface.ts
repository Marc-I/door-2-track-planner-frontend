export interface Activity {
  id: number;
  title: string;
  description: string;
  duration: number;
  difficulty: string;
  length: number;
  elevation: number;
  startLocation: { name: string; lat: number; lng: number };
  endLocation: { name: string; lat: number; lng: number };
  image: string;
} 