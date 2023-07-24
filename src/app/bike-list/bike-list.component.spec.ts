import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core'

import { BikeListComponent } from './bike-list.component';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { provideHttpClient } from '@angular/common/http';

describe('BikeListComponent', () => {
  let component: BikeListComponent;
  let fixture: ComponentFixture<BikeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BikeListComponent],
      providers: [provideHttpClient(), provideRouter(routes)]
      // providers: [importProvidersFrom(HttpClientTestingModule), provideRouter(routes)]
    });
    fixture = TestBed.createComponent(BikeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
