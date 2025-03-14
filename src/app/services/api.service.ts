import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanRequest } from '../models/plan-request.interface';
import { PlanResponse } from '../models/plan-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:3000/api/v1';  // Replace with actual API URL

    constructor(private http: HttpClient) {}

    getPlan(location: string, returnTime: string): Observable<PlanResponse> {
        const request: PlanRequest = {
        user_location: location,
        return_time: new Date(returnTime).toISOString()
        };

        return this.http.post<PlanResponse>(`${this.apiUrl}/plan`, request);
    }
}
