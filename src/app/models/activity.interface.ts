export interface Activity {
  track_name: string;
  duration_at_track: number;
  departure_time_home: string;
  arrival_time_track_start: string;
  departure_time_track_end: string;
  arrival_time_home: string;
  track_start_coordinates: {
    latitude: number;
    longitude: number;
  };
  track_end_coordinates: {
    latitude: number;
    longitude: number;
  };
} 