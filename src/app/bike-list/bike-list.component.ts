import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BikeDetailComponent } from './bike-detail/bike-detail.component';
import { BikeItemComponent } from './bike-item/bike-item.component';
import { Bike } from './bike.model';
import { BikeService } from '../services/bike.service';
import { Subject, takeUntil } from 'rxjs';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-bike-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    BikeDetailComponent,
    BikeItemComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.css']
})
export class BikeListComponent implements OnInit, OnDestroy{

  bikes: Bike[] = [];
  errorOccurred = false;
  isLoading = true;
  showDisclaimer = true;
  destroy$ = new Subject<void>();

  constructor(private bikeService: BikeService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    // this.isLoading = true;
    // this.errorOccurred = false;

    this.bikeService.fetchBikes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((bikes: Bike[]) => {
        this.bikes = bikes;
        this.isLoading = false;
        // load the first bike on the details panel, for better user presentation
        this.router.navigate(["/bikes", 0]);
      });

    //Will be notified by "BikeService" when an http error occurred, to display the appropriate message
    this.bikeService.errorOccurred
      .subscribe((status) => {
        this.errorOccurred = status;
        this.isLoading = false;
      }
    );

    this.bikeService.bikesChanged.subscribe(bikes => this.bikes = bikes);

    // Hide the "Click on a row to see more details on the right" after 10 seconds
    setTimeout(() => this.showDisclaimer = false, 10000);
  }

  onAddBike(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  trackByIndex(index: number, item: any){
    return index;
  }

  ngOnDestroy(): void {
      // unsubscribe from observable, to avoid memory leaks
      this.destroy$.next();
      this.destroy$.complete();
  }
}
