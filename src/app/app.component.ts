import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BikeListComponent } from './bike-list/bike-list.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, BikeListComponent, AuthComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Bike Shop';
}
