import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import {selectIsCartEmpty, selectTotalCartCost, selectTotalCartItems} from '../store/cart/cart.fetaures';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="navbar bg-base-100 sticky top-0 z-10">
      <div class="flex-1">
        <svg routerLink="shop" width="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" fill="#ffffff"></path> <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" fill="#ffffff"></path> <path d="M2.08416 2.7512C2.22155 2.36044 2.6497 2.15503 3.04047 2.29242L3.34187 2.39838C3.95839 2.61511 4.48203 2.79919 4.89411 3.00139C5.33474 3.21759 5.71259 3.48393 5.99677 3.89979C6.27875 4.31243 6.39517 4.76515 6.4489 5.26153C6.47295 5.48373 6.48564 5.72967 6.49233 6H8.15018L9.80491 15.3768C7.77998 15.359 6.6646 15.2416 5.92943 14.4662C5.06302 13.5523 4.99979 12.5816 4.99979 9.64L4.99979 7.03832C4.99979 6.29837 4.99877 5.80316 4.95761 5.42295C4.91828 5.0596 4.84858 4.87818 4.75832 4.74609C4.67026 4.61723 4.53659 4.4968 4.23336 4.34802C3.91052 4.18961 3.47177 4.03406 2.80416 3.79934L2.54295 3.7075C2.15218 3.57012 1.94678 3.14197 2.08416 2.7512Z" fill="#ffffff"></path> <path d="M11.3286 15.38H14.1714L15.8266 6H9.67335L11.3286 15.38Z" fill="#ffffff"></path> <path d="M17.3498 6.00005C18.9457 6.0011 20.3516 6.02515 20.7762 6.57708C21.2202 7.15417 21.0466 8.02369 20.6995 9.76275L20.1997 12.1875C19.8846 13.7164 19.727 14.4808 19.1753 14.9304C18.6236 15.38 17.8431 15.38 16.2821 15.38H15.6945L17.3498 6.00005Z" fill="#ffffff"></path> </g></svg>
        <a class="btn btn-ghost text-xl" routerLink="shop">NGRX Shop</a>
      </div>
      <div class="flex gap-2">
        <a routerLink="/cms">cms</a>
        <a routerLink="/login">login</a>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span class="badge badge-sm indicator-item">{{totalCartItems()}} </span>
            </div>
          </div>
          <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-slate-700 shadow">
            <div class="card-body">
              <span class="font-bold text-lg">{{totalCartItems()}} Items</span>
              <span class="text-info">Subtotal: € {{totalCost()}}</span>
              @if (!isEmpty()) {
                <div class="card-actions">
                  <button class="btn btn-primary btn-block" routerLink="cart">
                    View cart
                  </button>
                </div>
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
})
export class NavBarComponent {
  store = inject(Store)
  totalCartItems = this.store.selectSignal(selectTotalCartItems)
  totalCost = this.store.selectSignal(selectTotalCartCost)
  isEmpty = this.store.selectSignal(selectIsCartEmpty)
}
