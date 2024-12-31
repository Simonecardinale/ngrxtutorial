import {createActionGroup, createReducer, emptyProps, props} from '@ngrx/store';
import {Product} from '../../../model/products';
import {CartItem} from './cart.fetaures';


export const CartActions = createActionGroup({
  source: "Cart",
  events: {
    'Loaded From Local Storage': props<{ items: CartItem[] }>(),
    "Add": props<{item: Product}>(),
    "Remove": props<{id: number}>(),
    "Clear": emptyProps(),
    'Increase Quantity': props<{ id: number }>(),
    'Decrease Quantity': props<{ id: number }>(),
  }
})
