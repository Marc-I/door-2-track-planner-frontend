import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlannerService } from '../../services/planner.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-location-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    DecimalPipe
  ],
  templateUrl: './location-selector.component.html',
  styleUrl: './location-selector.component.scss'
})
export class LocationSelectorComponent implements OnInit {
  locationType: 'current' | 'custom' = 'current';
  locationName: string = '';

  constructor(
    private plannerService: PlannerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.plannerService.getLocationName().subscribe(name => {
      this.locationName = name;
    });
  }

  handleLocationTypeChange(type: 'current' | 'custom') {
    if (type === 'current') {
      // Simuliere Geolocation
      const location = { lat: 47.2692, lng: 11.4041 };
      this.locationName = 'Innsbruck';
      this.plannerService.setLocation(location, this.locationName);
    }
  }

  async handleNextStep() {
    if (this.plannerService.canNavigateToTime()) {
      await this.router.navigate(['/time']);
    }
  }
}
