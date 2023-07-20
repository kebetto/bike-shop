import { Injectable } from '@angular/core';
import { Bike } from './../bike-list/bike.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from './data-storage.service';
import { BikeService } from './bike.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolver implements Resolve<Bike[]> {
  constructor(
    private dataService: DataStorageService,
    private bikeService: BikeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const bikes = this.bikeService.getBikes();

    if (bikes.length === 0) {
      return this.dataService.fetchBikes();
    } else {
      return bikes;
    }
  }
}
