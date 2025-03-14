import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
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
    RouterModule,
    DecimalPipe
  ]
})
export class LocationSelectorComponent {
  locationType: 'current' | 'custom' = 'current';
  locationName: string = '';
  hasLocation = false;

  constructor(
    private plannerService: PlannerService,
    private router: Router
  ) {
    this.plannerService.getLocation().subscribe(location => {
      this.hasLocation = !!location;
    });
  }

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
