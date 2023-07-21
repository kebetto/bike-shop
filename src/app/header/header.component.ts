import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { DropdownDirective } from '../directives/dropdown.directive';
import { BikeService } from '../services/bike.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, DropdownDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;

  destroy$ = new Subject<void>();

  constructor(private bikeService: BikeService, private router: Router, private authService: AuthService){}

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

  onLogout(){
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.user
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.isAuthenticated = !!user);
  }

  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }
}
