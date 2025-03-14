import { Routes } from '@angular/router';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { TimeSelectorComponent } from './components/time-selector/time-selector.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { RouteDetailsComponent } from './components/route-details/route-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'location', pathMatch: 'full' },
  { 
    path: 'location', 
    component: LocationSelectorComponent,
    data: { step: 1, label: 'Standort auswählen' }
  },
  { 
    path: 'time', 
    component: TimeSelectorComponent,
    data: { step: 2, label: 'Zeit auswählen' }
  },
  { 
    path: 'activities', 
    component: ActivityListComponent,
    data: { step: 3, label: 'Aktivität auswählen' }
  },
  { 
    path: 'route', 
    component: RouteDetailsComponent,
    data: { step: 4, label: 'Route anzeigen' }
  }
];
