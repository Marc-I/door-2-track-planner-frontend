import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { Activity } from '../../models/activity.interface';
import { RouteSegment } from '../../models/route-segment.interface';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ]
})
export class RouteDetailsComponent {
  @Input() currentLocation: { lat: number; lng: number } | null = null;
  @Input() locationName: string = '';
  @Input() activity: Activity | null = null;
  @Input() returnTime: string = '';

  routeToActivity: RouteSegment[] = [
    {
      type: 'walk',
      from: 'Current Location',
      to: 'Bus Station 23',
      duration: 8,
      departureTime: '10:15',
      arrivalTime: '10:23'
    },
    {
      type: 'bus',
      line: '42A',
      from: 'Bus Station 23',
      to: 'Central Square',
      duration: 15,
      departureTime: '10:30',
      arrivalTime: '10:45'
    },
    {
      type: 'walk',
      from: 'Central Square',
      to: 'Start Location',
      duration: 5,
      departureTime: '10:45',
      arrivalTime: '10:50'
    }
  ];

  routeFromActivity: RouteSegment[] = [
    {
      type: 'walk',
      from: 'End Location',
      to: 'Bus Station',
      duration: 7,
      departureTime: '13:30',
      arrivalTime: '13:37'
    },
    {
      type: 'bus',
      line: 'U3',
      from: 'Bus Station',
      to: 'Main Station',
      duration: 12,
      departureTime: '13:45',
      arrivalTime: '13:57'
    },
    {
      type: 'bus',
      line: '15B',
      from: 'Main Station',
      to: 'Near Home',
      duration: 10,
      departureTime: '14:05',
      arrivalTime: '14:15'
    }
  ];

  getTotalDuration(): number {
    return [...this.routeToActivity, ...this.routeFromActivity]
      .reduce((total, segment) => total + segment.duration, 0);
  }
} 