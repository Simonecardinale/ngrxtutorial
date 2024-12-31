import {Component, inject, Signal} from '@angular/core';
import { Store } from '@ngrx/store';
import { CartActions } from '../../core/store/cart/cart.actions';
import {
  CartItem,
  selectIsCartEmpty,
  selectList,
  selectTotalCartCost,
  selectTotalCartItems
} from '../../core/store/cart/cart.fetaures';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports:[RouterLink],
  template: `

    @if(isCartEmpty()) {
      <div class="alert alert-error">Your Cart is Empty</div>
    } @else {
      <h1 class="text-xl my-6 font-bold ">Cart ({{totalCartItems()}} products)</h1>

      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <tbody>
            @for (item of cartList(); track item.product.id) {
              <tr>
                <th>
                  <img [src]="item.product.image" [alt]="item.product.name" width="100">
                </th>
                <td>{{item.product.name}}</td>
                <td>
                  <div class="flex gap-3 items-center">
                    € {{item.product.cost}} x {{item.qty}}
                    <button class="btn" (click)="decreaseQty(item.product.id)">-</button>
                    <button class="btn" (click)="increaseQty(item.product.id)">+</button>
                  </div>
                </td>
                <td class="text-right">
                  € {{item.product.cost * item.qty}}
                  <button class="btn btn-warning mx-2" (click)="deleteItem(item)">Delete</button>
                </td>
              </tr>
            } @empty {
              <div class="alert alert-info">Your Cart is Empty</div>
            }
          </tbody>
        </table>
      </div>

      <div class="flex justify-between my-6 py-6 border-t border-slate-600">
        <div class="text-3xl my-6 font-bold">
          total: € {{ totalCost() }}
        </div>
        <div>
          <button class="btn btn-lg btn-info" routerLink="/order-form">
            Proceed
          </button>
        </div>
      </div>
    }

  `,
})
export default class CartComponent {
  store = inject(Store);
  cartList: Signal<CartItem[]> = this.store.selectSignal(selectList)
  totalCartItems = this.store.selectSignal(selectTotalCartItems)
  isCartEmpty = this.store.selectSignal(selectIsCartEmpty)
  totalCost = this.store.selectSignal(selectTotalCartCost)

  deleteItem(item: CartItem) {
    this.store.dispatch(CartActions.remove({ id: item.product.id}))
  }

  decreaseQty(cartItemId: number) {
    this.store.dispatch(CartActions.decreaseQuantity({ id: cartItemId}))
  }
  increaseQty(cartItemId: number) {
    this.store.dispatch(CartActions.increaseQuantity({ id: cartItemId}))
  }
}
