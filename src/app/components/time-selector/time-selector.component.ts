import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ]
})
export class TimeSelectorComponent {
  @Input() returnTime: string = '';
  @Output() returnTimeChange = new EventEmitter<string>();

  timeType: 'today' | 'specific' = 'today';
  hours: string = '17';
  minutes: string = '00';

  hoursOptions = Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0'));
  minutesOptions = ['00', '15', '30', '45'];

  handleTimeTypeChange(type: 'today' | 'specific') {
    this.timeType = type;
    if (type === 'today') {
      this.returnTime = '17:00';
      this.returnTimeChange.emit(this.returnTime);
    }
  }

  handleHoursChange(hours: string) {
    this.hours = hours;
    this.updateReturnTime();
  }

  handleMinutesChange(minutes: string) {
    this.minutes = minutes;
    this.updateReturnTime();
  }

  private updateReturnTime() {
    this.returnTime = `${this.hours}:${this.minutes}`;
    this.returnTimeChange.emit(this.returnTime);
  }
}
