import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownDirective } from './dropdown.directive';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  template: `
    <div appDropdown></div>
  `
})
class HostComponent {}

describe('ThresholdWarningDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let div: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownDirective, HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    div = compiled.querySelector('div')!;
  });

  it('does not set the class initially', () => {
    expect(div.classList.contains('open')).toBe(false);
  });
});
