import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../../core/services/user.service';
import * as UserActions from '../actions/user.actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../core/services/auth.service';
import {loadFavoriteOffers} from '../../favorite-offer/actions/favorite-offer.actions';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  public checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.checkAuthStatus),
      switchMap(() => {
        const token = this.authService.getToken();
        if (token) {
          return this.userService.checkAuthStatus().pipe(
            map((user) => UserActions.checkAuthStatusSuccess({user})),
            catchError((error: HttpErrorResponse) =>
              of(UserActions.checkAuthStatusFailure({error: error.message})),
            ),
          );
        }
        return of(UserActions.checkAuthStatusFailure({error: 'No token'}));
      }),
    ),
  );

  public authSuccessLoadFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.checkAuthStatusSuccess), map(() => loadFavoriteOffers())));

  public login$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActions.login), switchMap(({credentials}) =>
      this.userService.login(credentials)
        .pipe(tap(user => this.authService.setToken(user.token)), map(user => UserActions.loginSuccess({user})),
          catchError((error: HttpErrorResponse) => of(UserActions.loginFailure({error: error.message})))))));

  public logout$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActions.logout), switchMap(() => this.userService.logout()
      .pipe(tap(() => this.authService.removeToken()), map(() => UserActions.logoutSuccess()),
        catchError((error: HttpErrorResponse) => of(UserActions.logoutFailure({error: error.message})))))));
}
