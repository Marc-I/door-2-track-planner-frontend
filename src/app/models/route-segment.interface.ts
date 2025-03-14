export interface RouteSegment {
  type: 'walk' | 'bus' | 'train';
  line?: string;
  from: string;
  to: string;
  duration: number;
  departureTime: string;
  arrivalTime: string;
} 