import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlanResponse } from '../models/plan-response.interface';

interface PlannerState {
  currentLocation: { lat: number; lng: number } | null;
  locationName: string;
  returnTime: string;
  selectedActivity: PlanResponse | null;
}

const STORAGE_KEY = 'plannerState';

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

  private state: BehaviorSubject<PlannerState>;

  constructor() {
    const savedState = sessionStorage.getItem(STORAGE_KEY);
    this.state = new BehaviorSubject<PlannerState>(
      savedState ? JSON.parse(savedState) : this.initialState
    );

    // Speichere State-Änderungen im SessionStorage
    this.state.subscribe(state => {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    });
  }

  // Location
  setLocation(location: { lat: number; lng: number }, name: string) {
    console.log('setLocation', location, name);
    this.state.next({
      ...this.state.value,
      currentLocation: location,
      locationName: name
    });
  }

  getLocation(): Observable<{ lat: number; lng: number } | null> {
    console.log('getLocation', this.state.value.currentLocation);
    return new Observable(subscriber => {
      subscriber.next(this.state.value.currentLocation);
      this.state.subscribe(state => subscriber.next(state.currentLocation));
    });
  }

  getLocationName(): Observable<string> {
    console.log('getLocationName', this.state.value.locationName);
    return new Observable(subscriber => {
      subscriber.next(this.state.value.locationName);
      this.state.subscribe(state => subscriber.next(state.locationName));
    });
  }

  // Return Time
  setReturnTime(time: string) {
    console.log('setReturnTime', time);
    this.state.next({
      ...this.state.value,
      returnTime: time
    });
  }

  getReturnTime(): Observable<string> {
    console.log('getReturnTime', this.state.value.returnTime);
    return new Observable(subscriber => {
      subscriber.next(this.state.value.returnTime);
      this.state.subscribe(state => subscriber.next(state.returnTime));
    });
  }

  // Activity
  setSelectedActivity(activity: PlanResponse) {
    console.log('setSelectedActivity', activity);
    this.state.next({
      ...this.state.value,
      selectedActivity: activity
    });
  }

  getSelectedActivity(): Observable<PlanResponse | null> {
    console.log('getSelectedActivity', this.state.value.selectedActivity);
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
    sessionStorage.removeItem(STORAGE_KEY);
    this.state.next(this.initialState);
  }
} 