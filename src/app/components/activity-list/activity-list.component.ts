import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { PlannerService } from '../../services/planner.service';
import { PlanResponse } from '../../models/plan-response.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterModule
  ]
})
export class ActivityListComponent implements OnInit {
  activities: PlanResponse[] = [];
  loading = false;
  error: string | null = null;
  hasSelectedActivity = false;

  constructor(
    private apiService: ApiService,
    private plannerService: PlannerService,
    private router: Router
  ) {
    this.plannerService.getSelectedActivity().subscribe(activity => {
      this.hasSelectedActivity = !!activity;
    });
  }

  ngOnInit() {
    this.loadActivities();
  }

  async loadActivities() {
    this.loading = true;
    this.error = null;

    try {
      console.log('Starting loadActivities...');
      
      const location = await firstValueFrom(this.plannerService.getLocationName());
      console.log('Location:', location);
      
      const returnTime = await firstValueFrom(this.plannerService.getReturnTime());
      console.log('Return time:', returnTime);

      if (!location || !returnTime) {
        this.error = 'Bitte wähle zuerst einen Standort und eine Rückkehrzeit.';
        console.log('Missing location or return time');
        this.loading = false;
        return;
      }

      console.log('Calling API with:', { location, returnTime });
      const response = await firstValueFrom(this.apiService.getPlan(location, returnTime));
      console.log('API Response:', response);
      
      this.activities = response || [];
      console.log('Activities set:', this.activities);
    } catch (err) {
      console.error('Detailed error:', err);
      this.error = 'Fehler beim Laden der Aktivitäten. Bitte versuche es später erneut.';
    } finally {
      this.loading = false;
    }
  }

  onSelect(activity: PlanResponse) {
    this.plannerService.setSelectedActivity(activity);
    this.router.navigate(['/route']);
  }

  getFormattedTime(time: string): string {
    return new Date(time).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
