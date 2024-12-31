import {Component, inject} from '@angular/core';
import {UserCartSummaryComponent} from './components/user-cart-summary.component';
import {UserInfoFormComponent} from './components/user-info-form.component';
import {OrderUserForm} from '../../model/order-user-form';
import {Store} from '@ngrx/store';
import {CartItem, selectList, selectTotalCartCost} from '../../core/store/cart/cart.fetaures';
import {OrderActions} from '../../core/store/cart/order.actions';

@Component({
  selector: 'app-shop-order-form',
  standalone: true,
  imports: [
    UserCartSummaryComponent,
    UserInfoFormComponent
  ],
  template: `

    <div class="bg-white">
      <!-- Background color split screen for large screens -->
      <div class="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true"></div>
      <div class="fixed top-0 right-0 hidden h-full w-1/2 bg-slate-900 lg:block" aria-hidden="true"></div>

      <!--Column Responsive layout-->
      <div class="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">

        <!--CART SUMMARY FORM-->
        <app-user-info-form (confirm)="sendOrder($event)" />
       <app-user-cart-summary [list]="cartList()" [totalCost]="totalCost()" />
      </div>
    </div>
  `,
  styles: ``
})
export default class ShopOrderFormComponent {
  store = inject(Store);
  cartList = this.store.selectSignal<CartItem[]>(selectList);
  totalCost = this.store.selectSignal(selectTotalCartCost);


  sendOrder(event: OrderUserForm) {
    this.store.dispatch(OrderActions.send({cart: this.cartList(), user: event}))
  }

}
