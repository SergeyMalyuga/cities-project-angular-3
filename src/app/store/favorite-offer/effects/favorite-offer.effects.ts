import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FavoriteOfferApiService} from '../../../core/services/favorite-offer-api.service';
import * as FavoriteActions from '../actions/favorite-offer.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOfferEffects {
  private actions$ = inject(Actions);
  private favoriteServiceApi = inject(FavoriteOfferApiService);

  public loadFavoriteOffers$ = createEffect(() =>
    this.actions$.pipe(ofType(FavoriteActions.loadFavoriteOffers), switchMap(() => this.favoriteServiceApi.getOffers()
      .pipe(map(favoriteOffers => FavoriteActions.loadFavoriteOffersSuccess({favoriteOffers})),
        catchError((error: HttpErrorResponse) => of(FavoriteActions.loadFavoriteOffersFailure({error: error.message})))))));

  public toggleFavoriteStatus$ = createEffect(() =>
    this.actions$.pipe(ofType(FavoriteActions.toggleFavoriteStatus),
      switchMap(({offerId, isFavorite}) => this.favoriteServiceApi.toggleFavorite(offerId, isFavorite)
        .pipe(map(offer => FavoriteActions.toggleFavoriteStatusSuccess({offer})),
          catchError((error: HttpErrorResponse) => of(FavoriteActions.toggleFavoriteStatusFailure({error: error.message})))))));
}
