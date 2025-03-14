import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanRequest } from '../models/plan-request.interface';
import { PlanResponse } from '../models/plan-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getPlan(location: { lat: number; lng: number }, returnTime: string): Observable<PlanResponse[]> {
    // Erstelle ein Datum für heute mit der angegebenen Uhrzeit
    const [returnDate, time] = returnTime.split(' ');
    const [hours, minutes] = time.split(':');
    const date = new Date(returnDate);
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(0);
    date.setMilliseconds(0);

    console.log('returnTime', returnTime);
    console.log('date', date);

    const request: PlanRequest = {
      home_coordinates: {
        latitude: location.lat,
        longitude: location.lng
      },
      return_time: date.toISOString()
    };

    return this.http.post<PlanResponse[]>(`${this.apiUrl}/plan`, request);
  }
}
