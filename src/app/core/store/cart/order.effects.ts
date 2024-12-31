import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';
import {catchError, map, mergeMap, of, tap} from 'rxjs';
import {selectList} from './cart.fetaures';
import {OrderActions} from './order.actions';
import {Product} from '../../../model/products';
import {Router} from '@angular/router';
import {CartActions} from './cart.actions';


export const sendOrder = createEffect((
  action$ = inject(Actions),
  http = inject(HttpClient)
) => {
  return action$.pipe(
    ofType(OrderActions.send),
    mergeMap((action) => {
     return http.post<Product[]>("http://localhost:3001/orders", {
        user: action.user,
        cart: action.cart
      })
        .pipe(
          map(() => OrderActions.sendSuccess()),
          catchError(() => of(OrderActions.sendFail()))
        )
    })
  )
}, {functional: true})

export const sendOrderSuccess = createEffect((
  action$ = inject(Actions),
  router = inject(Router)
) => {
  return action$.pipe(
    ofType(OrderActions.sendSuccess),
    map(() => CartActions.clear()),
    tap(() => router.navigateByUrl('/shop'))
  )
}, {functional: true})
