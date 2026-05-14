import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {TitleCasePipe} from '@angular/common';
import {HoverTrackerDirective} from '../../directives/hover-tracker';

@Component({
  selector: 'app-offer-card',
  imports: [
    TitleCasePipe,
    HoverTrackerDirective
  ],
  templateUrl: './offer-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCardComponent {
  @Input({required: true}) offer!: OfferPreview;
  @Output() hovered = new EventEmitter<OfferPreview>();

  protected readonly Math = Math;

  public onHovered(): void {
    this.hovered.emit(this.offer);
  }
}
