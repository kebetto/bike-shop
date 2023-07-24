import { take } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy, OnInit{

  isLoginMode = true;
  isLoading = false;
  isHidden = true;
  error: string | null = '';
  subscription! : Subscription;
  returnUrl!: string;

  constructor(private authService: AuthService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Not really need here, but just for demo purposes
    this.route.queryParams.subscribe((params: Params) => {
      this.returnUrl = params['returnUrl'];
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.subscription = this.authService.login(email, password)
      .subscribe(
        resData => {
          this.isLoading = false;
          this.router.navigate(['/bikes']);
        },
        errorMessage => {
          this.error = errorMessage;

          console.log(this.error)
          this.isLoading = false;
        }
      );

    form.reset();
  }

  onToggle(){
    this.isHidden = !this.isHidden;
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
