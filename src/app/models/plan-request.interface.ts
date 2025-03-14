export interface PlanRequest {
  home_coordinates: {
    latitude: number;
    longitude: number;
  };
  return_time: string;  // ISO 8601 format
} 