import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {NgClass, TitleCasePipe} from '@angular/common';
import {HoverTrackerDirective} from '../../directives/hover-tracker';
import {RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../../core/constants/const';
import {ScrollUpDirective} from '../../directives/scroll-up.directive';
import {FavoriteOfferService} from '../../../core/services/favorite-offer.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {selectAuthStatus} from '../../../store/user/selectors/user.selectors';
import {selectIsFavoriteOffersLoading} from '../../../store/favorite-offer/selectors/favorite-offer.selectors';

@Component({
  selector: 'app-offer-card',
  imports: [
    TitleCasePipe,
    HoverTrackerDirective,
    RouterLink,
    ScrollUpDirective,
    NgClass
  ],
  templateUrl: './offer-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCardComponent {
  @Input({required: true}) offer!: OfferPreview;
  @Input() isOfferPage = false;
  @Output() hovered = new EventEmitter<OfferPreview>();

  protected readonly AppRoute = AppRoute;
  protected readonly Math = Math;

  private favoriteOfferService = inject(FavoriteOfferService);
  private store = inject(Store<AppState>);

  public authStatus = this.store.selectSignal(selectAuthStatus);
  public isFavoriteOffersLoading = this.store.selectSignal(selectIsFavoriteOffersLoading);

  public onHovered(): void {
    this.hovered.emit(this.offer);
  }

  public changeFavoriteStatus() {
    this.favoriteOfferService.toggleFavoriteStatus(this.offer.id, !this.offer.isFavorite);
  }

  protected readonly AuthorizationStatus = AuthorizationStatus;
}
