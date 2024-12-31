import {Router, Routes} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectIsCartEmpty} from './core/store/cart/cart.fetaures';

export const routes: Routes = [
  { path: 'shop', loadComponent: () => import('./features/shop/shop.component')},
  { path: 'cart', loadComponent: () => import('./features/cart/cart.component')},
  { path: 'login', loadComponent: () => import('./features/login/login.component')},
  { path: 'order-form', loadComponent: () => import('./features/shop-order-form/shop-order-form.component'),
    canActivate: [
      () => {
        const store = inject(Store);
        const router = inject(Router);
        const isCartEmpty = store.selectSignal(selectIsCartEmpty);
        if (isCartEmpty()) {
          router.navigateByUrl('shop')
        }
        return !isCartEmpty()
      }
    ]
  },
  { path: 'cms', loadComponent: () => import('./features/cms/cms.component')},
  { path: 'counter', loadComponent: () => import('./features/counter/counter.component')},
  { path: '', redirectTo: 'shop', pathMatch: 'full' }
];
