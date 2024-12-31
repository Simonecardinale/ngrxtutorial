import { Component, input } from '@angular/core';
import {CartItem} from '../../../core/store/cart/cart.fetaures';

@Component({
  selector: 'app-user-cart-summary',
  standalone: true,
  imports: [],
  template: `

    <!--CART SUMMARY FORM-->
    <section aria-labelledby="summary-heading" class="bg-slate-900 py-12 text-slate-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-24">
      <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">

        <dl>
          <dt class="text-sm font-medium">Total</dt>
          <dd class="mt-1 text-3xl font-bold tracking-tight text-white">
            € {{ totalCost() }}
          </dd>
        </dl>

        <ul role="list" class="divide-y divide-white divide-opacity-10 text-sm font-medium">
          @for (item of list(); track item.product.id) {
            <li class="flex items-start space-x-4 py-6">
              <img
                [src]="item.product.image"
                [alt]="item.product.name"
                class="h-20 w-20 flex-none rounded-md object-cover object-center"
              >
              <div class="flex-auto space-y-1">
                <h3 class="text-white">{{ item.product.name }}</h3>
                <p>Cost: € {{item.product.cost}} </p>
                <p>Qty: {{item.qty}}</p>
              </div>
              <p class="flex-none text-base font-medium text-white">
                € {{ item.product.cost * item.qty }}
              </p>
            </li>
          }
        </ul>

        <dl class="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
          <div class="flex items-center justify-between">
            <dt>Subtotal</dt>
            <dd>€ {{ totalCost()  }}</dd>
          </div>

          <div class="flex items-center justify-between">
            <dt>Shipping</dt>
            <dd>€ {{ shippingCost }}</dd>
          </div>

          <div class="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
            <dt class="text-base">Total</dt>
            <dd class="text-base">€ {{ totalCost() + shippingCost  }}</dd>
          </div>
        </dl>
      </div>
    </section>

  `,
  styles: ``
})
export class UserCartSummaryComponent {
  list = input.required<CartItem[]>()
  totalCost = input.required<number>()

  shippingCost = 10;
}
