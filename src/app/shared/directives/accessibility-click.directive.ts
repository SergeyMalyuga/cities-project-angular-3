import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appAccessibilityClick]',
})
export class AccessibilityClickDirective {
  @Output() accessibilityClicked = new EventEmitter<void>();

  @HostListener('click', ['$event'])
  onClick(evt: MouseEvent) {
    evt.preventDefault();
    this.accessibilityClicked.emit();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      this.accessibilityClicked.emit();
    }
  }
}
