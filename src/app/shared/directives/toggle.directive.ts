import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appToggle]'
})
export class AppToggleDirective {
  @Output() toggled = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  @HostListener('click', ['$event'])
  onClick(evt: MouseEvent) {
    evt.stopPropagation();
    this.toggled.emit();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.stopPropagation();
      evt.preventDefault();
      this.closed.emit();
    } else if (evt.key === 'Escape') {
      this.closed.emit();
    }
  }
}
