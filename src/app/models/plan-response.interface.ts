import { TrackCoordinates } from './coordinates.interface';

export interface PlanResponse {
  track_name: {
    de: string;
    en: string;
  };
  departure_time_home: string;
  arrival_time_track_start: string;
  track_start_coordinates: TrackCoordinates;
  departure_time_track_end: string; 
  track_end_coordinates: TrackCoordinates;
  arrival_time_home: string;
  duration_at_track: number;
} 