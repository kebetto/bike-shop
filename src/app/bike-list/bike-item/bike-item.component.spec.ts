import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeItemComponent } from './bike-item.component';
import { provideHttpClient } from '@angular/common/http';
import { routes } from 'src/app/app.routes';

describe('BikeItemComponent', () => {
  let component: BikeItemComponent;
  let fixture: ComponentFixture<BikeItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BikeItemComponent],
      providers: [provideHttpClient(), provideRouter(routes)]
    });
    fixture = TestBed.createComponent(BikeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


