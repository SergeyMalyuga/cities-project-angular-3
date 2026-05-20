import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../models/app.state';
import {Router} from '@angular/router';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {AppRoute, AuthorizationStatus} from '../constants/const';
import {toggleFavoriteStatus} from '../../store/favorite-offer/actions/favorite-offer.actions';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class FavoriteOfferService {
  private store = inject(Store<AppState>);
  private router = inject(Router);
  private authStatus = this.store.selectSignal(selectAuthStatus);

  public toggleFavoriteStatus(offerId: string, isFavorite: boolean) {
    if (this.authStatus() === AuthorizationStatus.AUTH) {
      this.store.dispatch(toggleFavoriteStatus({offerId, isFavorite}));
    } else {
      this.router.navigate([AppRoute.LOGIN]);
    }
  }
}
