import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  constructor(private elRef: ElementRef){}

  @HostListener('document:click', ['$event'])
  public toggleOpen(event: MouseEvent): void {
    const targetElement = event.target;
      const clickedInside = this.elRef.nativeElement.contains(targetElement);
      if (clickedInside) {
          this.isOpen = !this.isOpen;
      }
      else this.isOpen = false;
  }
}
