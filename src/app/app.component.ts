import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Activity } from './models/activity.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { TimeSelectorComponent } from './components/time-selector/time-selector.component';
import { RouteDetailsComponent } from './components/route-details/route-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ActivityListComponent,
    LocationSelectorComponent,
    TimeSelectorComponent,
    RouteDetailsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'door2track';
  step = 1;
  loading = false;
  currentLocation: { lat: number; lng: number } | null = null;
  locationName = '';
  returnTime = '';
  selectedActivity: Activity | null = null;
  suggestedActivities: Activity[] = [];

  ngOnInit() {
    // Get current location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.locationName = 'Current Location';
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }

  handleNextStep() {
    this.loading = true;

    // Simulate API calls
    setTimeout(() => {
      if (this.step === 2) {
        // After setting return time, fetch suggested activities
        this.suggestedActivities = [
          {
            id: 1,
            title: 'Panorama-Loipe Alpenblick',
            description: 'Leichte Langlaufloipe mit herrlichem Bergpanorama',
            duration: 120,
            difficulty: 'Leicht',
            length: 8,
            elevation: 120,
            startLocation: { name: 'Bergstation Alpenblick', lat: 47.3021, lng: 11.8735 },
            endLocation: { name: 'Bergstation Alpenblick', lat: 47.3021, lng: 11.8735 },
            image: '/placeholder.svg'
          },
          // ... weitere Aktivitäten ...
        ];
      }

      this.loading = false;
      this.step++;
    }, 1000);
  }

  onSelectActivity(activity: Activity) {
    this.selectedActivity = activity;
    this.step = 4;
  }

  goBack() {
    this.step--;
  }

  startNewPlanning() {
    this.step = 1;
    this.selectedActivity = null;
    this.returnTime = '';
  }
}
