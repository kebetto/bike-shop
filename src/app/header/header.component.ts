import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DropdownDirective } from '../directives/dropdown.directive';
import { Subject, takeUntil } from 'rxjs';
import { BikeService } from '../services/bike.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, DropdownDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  collapsed = true;
  destroy$ = new Subject<void>();

  constructor(private bikeService: BikeService, private router: Router){}

  onDataSave(){
    const bikes = this.bikeService.getBikes();
    this.bikeService.storeBikes(bikes).subscribe();
    this.router.navigate(['/']);
  }

  onDataFetch(){
    this.bikeService.fetchBikes().subscribe();
    this.bikeService.errorOccurred.next(false);
    this.router.navigate(['/']);
  }
}
