import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {appReducer} from './store/app/app.reducer';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import {OfferEffects} from './store/offer/effects/offer.effects';
import {UserEffects} from './store/user/effects/user.effects';

export const appConfig: ApplicationConfig = {
  providers:
    [provideZoneChangeDetection({eventCoalescing: true}),
      provideRouter(routes),
      provideStore(appReducer),
      provideHttpClient(withInterceptorsFromDi()),
      provideEffects(OfferEffects, UserEffects)
    ]
};
