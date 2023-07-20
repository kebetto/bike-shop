import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BikeDetailComponent } from './bike-detail/bike-detail.component';
import { BikeItemComponent } from './bike-item/bike-item.component';
import { Bike } from './bike.model';
import { DataStorageService } from './../services/data-storage.service';
import { BikeService } from '../services/bike.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bike-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, BikeDetailComponent, BikeItemComponent],
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.css']
})
export class BikeListComponent implements OnInit, OnDestroy{

  bikes: Bike[] = [];
  errorOccurred = false;
  destroy$ = new Subject<void>();

  constructor(private bikeService: BikeService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataStorageService){}

  ngOnInit(): void {

    this.bikeService.fetchBikes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((bikes: Bike[]) => {
          this.bikes = bikes;
      });

    this.bikeService.errorOccurred
      .subscribe(error => {
        this.errorOccurred = true;
        setTimeout(() => this.errorOccurred = false, 5000);
      }
    );

    this.bikeService.bikesChanged.subscribe(bikes => this.bikes = bikes);
  }

  onAddBike(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  trackByIndex(index: number, item: any){
    return index;
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
