import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { routes } from './app.routes';

interface RouteData {
  path: string;
  data?: {
    step: number;
    label: string;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class AppComponent {
  routes = routes.filter(route => route.path !== '') as RouteData[];
  loading = false;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {  }

  isRouteActive(path: string): boolean {
    return this.router.url.includes(path);
  }

  getCurrentStepLabel(): string {
    const currentRoute = this.routes.find(route => this.isRouteActive(route.path));
    return currentRoute?.data?.label || '';
  }

  isLastStep(): boolean {
    const currentRoute = this.routes.find(route => this.isRouteActive(route.path));
    return currentRoute?.data?.step === 4;
  }

  async handleNextStep() {
    this.loading = true;
    const currentRoute = this.routes.find(route => this.isRouteActive(route.path));
    const nextRoute = this.routes.find(route => 
      route.data?.step === (currentRoute?.data?.step || 0) + 1
    );

    if (nextRoute) {
      await this.router.navigate([nextRoute.path]);
    }
    this.loading = false;
  }
}
