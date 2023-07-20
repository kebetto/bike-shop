import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeEditComponent } from './bike-edit.component';

describe('BikeEditComponent', () => {
  let component: BikeEditComponent;
  let fixture: ComponentFixture<BikeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BikeEditComponent]
    });
    fixture = TestBed.createComponent(BikeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
