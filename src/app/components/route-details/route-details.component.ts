import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { PlannerService } from '../../services/planner.service';
import { PlanResponse } from '../../models/plan-response.interface';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ]
})
export class RouteDetailsComponent implements OnInit {
  activity: PlanResponse | null = null;
  routeToActivity = [
    { type: 'walk', duration: 5 },
    { type: 'bus', line: '6A', duration: 15 },
    { type: 'walk', duration: 10 }
  ];

  constructor(
    private plannerService: PlannerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.plannerService.getSelectedActivity().subscribe(activity => {
      if (!activity) {
        this.router.navigate(['/activities']);
        return;
      }
      this.activity = activity;
    });
  }

  getTotalDuration(): number {
    return this.routeToActivity.reduce((total, segment) => total + segment.duration, 0);
  }

  resetPlanner() {
    this.plannerService.reset();
    this.router.navigate(['/']);
  }
} 