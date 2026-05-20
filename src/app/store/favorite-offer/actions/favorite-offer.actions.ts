import {createAction, props} from '@ngrx/store';
import {Offer, OfferPreview} from '../../../core/models/offers';

export const loadFavoriteOffers = createAction('[FavoriteOffer] Load Offers');
export const loadFavoriteOffersSuccess = createAction('[FavoriteOffer] Load Offers Success',
  props<{ favoriteOffers: OfferPreview[] }>());
export const loadFavoriteOffersFailure = createAction('[FavoriteOffer] Load Offers Failure',
  props<{ error: string }>());

export const toggleFavoriteStatus = createAction('[FavoriteOffer] Change Status',
  props<{offerId: string, isFavorite: boolean}>());
export const toggleFavoriteStatusSuccess = createAction('[FavoriteOffer] Change Status Success',
  props<{offer: Offer}>());
export const toggleFavoriteStatusFailure = createAction('[FavoriteOffer] Change Status Failure',
  props<{ error: string }>());
