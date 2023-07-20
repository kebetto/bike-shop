import { Injectable } from '@angular/core';
import { BikeService } from './bike.service';
import { HttpClient } from '@angular/common/http';
import { Bike } from '../bike-list/bike.model';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) {}

  storeBikes(bikes: Bike[]) {
    return this.http
      .put<Bike[]>('https://kevin-angular.firebaseio.com/bikes.json', bikes);
  }

  fetchBikes() {
    return this.http
      .get<Bike[]>('https://kevin-angular.firebaseio.com/bikes.json');
    }
}
