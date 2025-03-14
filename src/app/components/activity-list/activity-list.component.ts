import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Activity } from '../../models/activity.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule, MatChipListbox } from '@angular/material/chips';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatChipListbox
  ],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.scss'
})
export class ActivityListComponent {
  @Input() activities: Activity[] = [];
  @Output() selectActivity = new EventEmitter<Activity>();

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins} Minuten`;
    } else if (mins === 0) {
      return `${hours} Stunde${hours > 1 ? 'n' : ''}`;
    } else {
      return `${hours} Stunde${hours > 1 ? 'n' : ''} ${mins} Minuten`;
    }
  }

  onSelect(activity: Activity): void {
    this.selectActivity.emit(activity);
  }
}
