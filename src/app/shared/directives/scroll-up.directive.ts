import { Directive, HostListener, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appScrollUp]',
  standalone: true
})
export class ScrollUpDirective {
  @Input() enable = false;

  private readonly windowRef: Window | null;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.windowRef = this.document.defaultView;
  }

  @HostListener('click')
  onClick(): void {
    if (!this.enable || !this.windowRef) return;

    this.windowRef.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
