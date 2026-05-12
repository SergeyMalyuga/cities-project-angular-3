import {createAction, props} from '@ngrx/store';
import {OfferPreview} from '../../../core/models/offers';

export const loadOffers = createAction('[App Component] Load Offers]');
export const loadOffersSuccess = createAction('[API Offers] Load Offers Success',
  props<{ offers: OfferPreview[] }>());
export const loadOffersFailure = createAction('[API Offers] Load Offer Failure',
  props<{ error: string }>());
