import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event.target']) close(
    target: HTMLElement
  ) {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.isOpen = false;
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
}
