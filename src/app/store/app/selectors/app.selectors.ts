import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';

const selectOfferState = createFeatureSelector<AppState['offers']>('offers');

const selectCityState = createFeatureSelector<AppState['city']>('city');

export const selectOffersByCity = createSelector(
  selectOfferState,
  selectCityState,
  (offerState, city) =>
    Object.values(offerState.entities)
      .filter(offer => offer !== undefined)
      .filter(offer => offer.city.name === city.name)
)
