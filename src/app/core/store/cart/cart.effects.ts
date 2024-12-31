import {Actions, createEffect, ofType, rootEffectsInit} from '@ngrx/effects';
import {inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {CartActions} from './cart.actions';
import {map, tap} from 'rxjs';
import {selectList} from './cart.fetaures';


export const saveCartInLocalStorage = createEffect((
  store = inject(Store),
  actions$ = inject(Actions)
) => {
  return actions$.pipe(
    ofType(
      CartActions.add,
      CartActions.increaseQuantity,
      CartActions.decreaseQuantity,
      CartActions.clear,
      CartActions.remove
    ),
    tap(() => {
      const cartList = store.selectSignal(selectList);
      localStorage.setItem('cartList', JSON.stringify(cartList()));
    })
  )
},
  {functional: true, dispatch: false}
)


export const loadCartFromLocalStorage = createEffect((
  actions$ = inject(Actions)
) => {
  return actions$.pipe(
    ofType(rootEffectsInit),
    map(() => {
      const cartFromLocalStorage = localStorage.getItem('cartList');
      if(cartFromLocalStorage) {
        return CartActions.loadedFromLocalStorage({items: JSON.parse(cartFromLocalStorage)});
      }
      else {
        return CartActions.loadedFromLocalStorage({items: []});
      }
    })
  )
},{functional: true})

