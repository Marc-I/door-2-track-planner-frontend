import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Activity } from '../models/activity.interface';

interface PlannerState {
  currentLocation: { lat: number; lng: number } | null;
  locationName: string;
  returnTime: string;
  selectedActivity: Activity | null;
}

@Injectable({
  providedIn: 'root'
})
export class PlannerService {
  private initialState: PlannerState = {
    currentLocation: null,
    locationName: '',
    returnTime: '',
    selectedActivity: null
  };

  private state = new BehaviorSubject<PlannerState>(this.initialState);

  // Location
  setLocation(location: { lat: number; lng: number }, name: string) {
    this.state.next({
      ...this.state.value,
      currentLocation: location,
      locationName: name
    });
  }

  getLocation(): Observable<{ lat: number; lng: number } | null> {
    return new Observable(subscriber => {
      subscriber.next(this.state.value.currentLocation);
      this.state.subscribe(state => subscriber.next(state.currentLocation));
    });
  }

  getLocationName(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next(this.state.value.locationName);
      this.state.subscribe(state => subscriber.next(state.locationName));
    });
  }

  // Return Time
  setReturnTime(time: string) {
    this.state.next({
      ...this.state.value,
      returnTime: time
    });
  }

  getReturnTime(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next(this.state.value.returnTime);
      this.state.subscribe(state => subscriber.next(state.returnTime));
    });
  }

  // Activity
  setSelectedActivity(activity: Activity) {
    this.state.next({
      ...this.state.value,
      selectedActivity: activity
    });
  }

  getSelectedActivity(): Observable<Activity | null> {
    return new Observable(subscriber => {
      subscriber.next(this.state.value.selectedActivity);
      this.state.subscribe(state => subscriber.next(state.selectedActivity));
    });
  }

  // Navigation Guards
  canNavigateToTime(): boolean {
    return !!this.state.value.currentLocation && !!this.state.value.locationName;
  }

  canNavigateToActivities(): boolean {
    return this.canNavigateToTime() && !!this.state.value.returnTime;
  }

  canNavigateToRoute(): boolean {
    return this.canNavigateToActivities() && !!this.state.value.selectedActivity;
  }

  // Reset
  reset() {
    this.state.next(this.initialState);
  }
} 