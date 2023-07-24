import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, of, throwError } from 'rxjs';

import { Bike } from '../bike-list/bike.model';
import { DataStorageService } from './data-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  private bikes: Bike[] = [];

  bikesChanged = new Subject<Bike[]>();
  errorOccurred = new Subject<boolean>();

  constructor(private dataService: DataStorageService) { }

  setBikes(bikes: Bike[]) {
    this.bikes = bikes;
    this.bikesChanged.next(this.bikes.slice());
  }

  getBikes() {
    return this.bikes.slice();
  }

  getBike(index: number) {
    return this.bikes[index];
  }

  addBike(bike: Bike) {
    this.bikes.push(bike);
    return this.storeBikes(this.bikes);
  }

  updateBike(index: number, updatedBike: Bike) {
    this.bikes[index] = updatedBike;
    return this.storeBikes(this.bikes);
  }

  deleteBike(index: number) {
    this.bikes.splice(index, 1);
    this.bikesChanged.next(this.bikes.slice());
    this.storeBikes(this.bikes).subscribe();
  }

  fetchBikes(): Observable<Bike[]>{
    return this.dataService.fetchBikes()
      .pipe(
        tap(bikes => this.setBikes(bikes)),
        catchError(() => {
        this.errorOccurred.next(true);
        return EMPTY;
      })
    );
  }

  storeBikes(bikes: Bike[]): Observable<Bike[]>{
    return this.dataService.storeBikes(bikes)
      .pipe(
        tap(bikes => this.setBikes(bikes)),
        catchError(() => {
        this.errorOccurred.next(true);
        return EMPTY;
      })
    );
  }
}

