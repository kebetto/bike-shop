import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};

export const environment = {
  firebaseAPIkey: "AIzaSyCH8UZ2oG3x6jGsxpPR6bDlNwXSOVlYO9w"
};
