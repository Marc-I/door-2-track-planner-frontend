import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PlannerService } from '../../services/planner.service';

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
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class TimeSelectorComponent {
  returnType: 'today' | 'other' = 'today';
  selectedDate: Date | null = null;
  hours: string = '17';
  minutes: string = '00';

  hoursOptions = Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0'));
  minutesOptions = ['00', '15', '30', '45'];

  constructor(private plannerService: PlannerService) {
    this.updateReturnTime();
  }

  handleReturnTypeChange(type: 'today' | 'other') {
    this.returnType = type;
    if (type === 'other' && !this.selectedDate) {
      this.selectedDate = new Date();
    }
    this.updateReturnTime();
  }

  handleDateChange() {
    this.updateReturnTime();
  }

  handleTimeChange() {
    this.updateReturnTime();
  }

  private updateReturnTime() {
    const time = `${this.hours}:${this.minutes}`;
    if (this.returnType === 'today') {
      this.plannerService.setReturnTime(time);
    } else if (this.selectedDate) {
      const date = this.selectedDate.toLocaleDateString('de-DE');
      this.plannerService.setReturnTime(`${date} ${time}`);
    }
  }

  getReturnTimeDisplay(): string {
    if (this.returnType === 'today') {
      return `Heute um ${this.hours}:${this.minutes} Uhr`;
    } else if (this.selectedDate) {
      return `Am ${this.selectedDate.toLocaleDateString('de-DE')} um ${this.hours}:${this.minutes} Uhr`;
    }
    return 'Nicht festgelegt';
  }
}
