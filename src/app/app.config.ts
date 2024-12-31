import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {provideEffects} from '@ngrx/effects';
import * as productsEffects from './core/store/products/products.effects';
import * as cartEffects from './core/store/cart/cart.effects';
import * as orderEffects from './core/store/cart/order.effects';
import * as authEffects from './core/store/auth/auth.effects';
import {provideHttpClient} from '@angular/common/http';
import {productsFeature} from './core/store/products/products.feature';
import {cartFeature} from './core/store/cart/cart.fetaures';
import {shopFiltersFeature} from './core/store/shop/shop-filters.feature';
import {uiFeatures} from './core/store/ui/ui.features';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({}, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionTypeUniqueness: true
      }
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([productsEffects, cartEffects, orderEffects, authEffects]),
    provideState(productsFeature),
    provideState(cartFeature),
    provideState(shopFiltersFeature),
    provideState(uiFeatures)
]
};
