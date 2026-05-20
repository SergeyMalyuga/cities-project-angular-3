import {ActionReducerMap} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {offerReducer} from '../offer/offer.reducer';
import {cityReducer} from '../city/city.reducer';
import {userReducer} from '../user/user.reducer';
import {favoriteOfferReducer} from '../favorite-offer/favorite-offer.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  offers: offerReducer,
  city: cityReducer,
  user: userReducer,
  favoriteOffers: favoriteOfferReducer,
}
