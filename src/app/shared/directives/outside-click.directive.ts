import {Directive, ElementRef, EventEmitter, HostListener, inject, Input, Output} from '@angular/core';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective {
  @Input({required: true}) isEnable!: boolean;
  @Output() outsideClicked = new EventEmitter<void>();

  private elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onClick(evt: MouseEvent) {
    if (this.isEnable) {
      const target = evt.target as HTMLElement;
      if (!this.elementRef.nativeElement.contains(target)) {
        this.outsideClicked.emit();
      }
    }
  }
}
