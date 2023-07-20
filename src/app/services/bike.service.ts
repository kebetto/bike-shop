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
  errorOccurred = new Subject<HttpErrorResponse>();

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
    this.bikesChanged.next(this.bikes.slice());
  }

  updateBike(index: number, updatedBike: Bike) {
    this.bikes[index] = updatedBike;

    console.log(this.bikes);

    // this.bikesChanged.next(this.bikes.slice());
    this.storeBikes(this.bikes).subscribe();
  }

  deleteBike(index: number) {
    this.bikes.splice(index, 1);
    this.bikesChanged.next(this.bikes.slice());
  }

  fetchBikes(): Observable<Bike[]>{
    return this.dataService.fetchBikes()
      .pipe(
        tap(bikes => this.setBikes(bikes)),
        catchError(error => {
        this.errorOccurred.next(error);
        return EMPTY;
      }));
  }

  storeBikes(bikes: Bike[]): Observable<Bike[]>{
    return this.dataService.storeBikes(bikes)
      .pipe(
        tap(bikes => this.setBikes(bikes)),
        catchError(error => {
        this.errorOccurred.next(error);
        return EMPTY;
      }));
  }
}

