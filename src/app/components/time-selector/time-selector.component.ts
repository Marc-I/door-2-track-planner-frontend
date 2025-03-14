import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { PlannerService } from '../../services/planner.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    RouterModule
  ]
})
export class TimeSelectorComponent {
  dateType: 'today' | 'other' = 'today';
  hours: string[] = [];
  minutes: string[] = ['00', '15', '30', '45'];
  selectedHour = '';
  selectedMinute = '00';
  selectedDate: Date | null = null;
  hasReturnTime = false;
  errorMessage = '';
  minDate = new Date();
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  constructor(private plannerService: PlannerService) {
    this.plannerService.getReturnTime().subscribe(time => {
      this.hasReturnTime = !!time;
    });
    this.updateAvailableHours();
  }

  private updateAvailableHours() {
    const now = new Date();
    const minTime = new Date(now.getTime() + 6 * 60 * 60 * 1000);
    
    if (this.dateType === 'today') {
      const minHour = minTime.getHours();
      
      if (minTime.getDate() > now.getDate()) {
        this.errorMessage = 'Heute können keine weiteren Wanderungen mehr geplant werden.';
        this.hours = [];
        return;
      }

      this.hours = Array.from({ length: 24 - minHour }, (_, i) => {
        const hour = minHour + i;
        return hour.toString().padStart(2, '0');
      });
    } else {
      // Für andere Tage alle Stunden verfügbar
      this.hours = Array.from({ length: 24 }, (_, i) => {
        return i.toString().padStart(2, '0');
      });
    }

    if (this.hours.length > 0) {
      this.selectedHour = this.hours[0];
      this.errorMessage = '';
    }
  }

  onDateTypeChange() {
    if (this.dateType === 'today') {
      this.selectedDate = null;
    } else {
      this.selectedDate = new Date();
    }
    this.updateAvailableHours();
    this.onTimeChange();
  }

  onDateChange() {
    this.updateAvailableHours();
    this.onTimeChange();
  }

  onTimeChange() {
    if (!this.selectedHour || !this.selectedMinute) return;

    const now = new Date();
    const selectedDateTime = this.dateType === 'today' ? now : (this.selectedDate || now);
    selectedDateTime.setHours(parseInt(this.selectedHour, 10));
    selectedDateTime.setMinutes(parseInt(this.selectedMinute, 10));
    selectedDateTime.setSeconds(0);
    selectedDateTime.setMilliseconds(0);

    const minTime = new Date((new Date()).getTime() + 6 * 60 * 60 * 1000);

    if (selectedDateTime.getTime() >= minTime.getTime()) {
      const timeString = `${selectedDateTime.toISOString().split('T')[0]} ${this.selectedHour}:${this.selectedMinute}`;
      this.plannerService.setReturnTime(timeString);
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Bitte wähle eine Zeit mindestens 6 Stunden in der Zukunft.';
      this.plannerService.setReturnTime(minTime.toISOString());
    }
  }
}
