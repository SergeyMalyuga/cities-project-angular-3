import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {favoriteOfferAdapter} from '../favorite-offer.reducer';

const selectFavoriteOffersState = createFeatureSelector<AppState['favoriteOffers']>('favoriteOffers');
const favoriteOfferSelectors = favoriteOfferAdapter.getSelectors();

export const selectFavoriteOffers = createSelector(
  selectFavoriteOffersState,
  favoriteOfferSelectors.selectAll
);

export const selectIsFavoriteOffersLoading = createSelector(
  selectFavoriteOffersState,
  state => state.isLoading
);

export const selectFavoriteOffersTotal = createSelector(
  selectFavoriteOffersState,
  favoriteOfferSelectors.selectTotal
);

