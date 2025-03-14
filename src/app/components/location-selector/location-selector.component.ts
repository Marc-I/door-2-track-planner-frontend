import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { PlannerService } from '../../services/planner.service';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ]
})
export class LocationSelectorComponent {
  locationType: 'current' | 'other' = 'current';
  hasLocation = false;
  manualLocation = '';

  constructor(private plannerService: PlannerService) {
    this.plannerService.getLocation().subscribe(location => {
      this.hasLocation = !!location;
    });
  }

  onLocationTypeChange() {
    if (this.locationType === 'current') {
      this.getCurrentLocation();
    } else {
      this.plannerService.setLocation({ lat: 47.2692124, lng: 11.4041024 }, '');
    }
  }

  onManualLocationSubmit() {
    if (this.manualLocation) {
      // Verwende Innsbruck als Beispiel-Koordinaten
      this.plannerService.setLocation(
        { lat: 47.2692124, lng: 11.4041024 },
        this.manualLocation
      );
    }
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          // Verwende die Koordinaten als Name
          const name = `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
          this.plannerService.setLocation(location, name);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }
}
