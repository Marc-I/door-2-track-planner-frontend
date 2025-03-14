import { Component, Input, Output, EventEmitter } from '@angular/core';
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
export class LocationSelectorComponent {
  @Input() currentLocation: { lat: number; lng: number } | null = null;
  @Input() locationName: string = '';
  @Output() locationNameChange = new EventEmitter<string>();

  locationType: 'current' | 'custom' = 'current';
  customLocation: string = '';

  handleLocationTypeChange(value: 'current' | 'custom'): void {
    this.locationType = value;
    if (value === 'current') {
      this.setLocationName('Current Location');
    } else {
      this.setLocationName(this.customLocation);
    }
  }

  handleCustomLocationChange(event: any): void {
    this.customLocation = event.target.value;
    if (this.locationType === 'custom') {
      this.setLocationName(event.target.value);
    }
  }

  private setLocationName(name: string): void {
    this.locationNameChange.emit(name);
  }
}
