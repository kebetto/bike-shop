import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};

export const environment = {
  firebaseAPIkey: "AIzaSyCH8UZ2oG3x6jGsxpPR6bDlNwXSOVlYO9w"
  // firebaseAPIkey: "AIzaSyCH8UZ2oG3x6jGsxpPR6bDlNwXSOVlYO9w"
};
