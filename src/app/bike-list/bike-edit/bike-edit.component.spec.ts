import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeEditComponent } from './bike-edit.component';
import { provideRouter } from '@angular/router';
import { routes } from 'src/app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BikeEditComponent', () => {
  let component: BikeEditComponent;
  let fixture: ComponentFixture<BikeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BikeEditComponent],
      providers: [importProvidersFrom(HttpClientTestingModule), provideRouter(routes)]
    });
    fixture = TestBed.createComponent(BikeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

