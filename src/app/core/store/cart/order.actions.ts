import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {OrderUserForm} from '../../../model/order-user-form';
import {CartItem} from './cart.fetaures';


export const OrderActions = createActionGroup({
  source: "Order",
  events: {
    "Send": props<{user: OrderUserForm, cart: CartItem[]}>(),
    "Send Success": emptyProps(),
    "Send Fail": emptyProps(),
  }
})
