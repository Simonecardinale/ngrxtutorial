import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {selectList} from '../../core/store/products/products.feature';
import {ProductsActions} from '../../core/store/products/products.actions';
import {Product} from '../../model/products';
import {CartActions} from '../../core/store/cart/cart.actions';
import {ShopFiltersComponent} from './components/shop-filters.component';
import {ShopFilters} from '../../model/shop-filters';
import {ShopFiltersActions} from '../../core/store/shop/shop-filters.actions';
import {selectFilteredList, selectShopFiltersState} from '../../core/store/shop/shop-filters.feature';
import {UiActions} from '../../core/store/ui/ui.actions';
import {selectSidePanelOpened} from '../../core/store/ui/ui.features';

@Component({
  selector: 'app-shop',
  standalone: true,
  template: `
    <app-shop-filters
      (changeFilters)="updateFilters($event)"
      [isOpen]="isOpen()"
      (close)="closePanel()"
      [filters]="filters()"
    />

    <div class="flex justify-center m-6">
      <button class="btn" (click)="togglePanel()">FILTERS</button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      @for (product of products(); track product.id) {
        <div class="card bg-slate-900 shadow-xl">
          <figure>
            <img [src]="product.image" [alt]="product.name"/></figure>
          <div class="card-body">
            <h2 class="card-title">{{ product.name }}</h2>
            <div class="card-actions justify-end">
              <button (click)="addToCart(product)" class="btn btn-outline btn-primary">Add to Cart |
                € {{ product.cost }}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  imports: [
    ShopFiltersComponent
  ]
})
export default class ShopComponent implements OnInit {
  store = inject(Store)
  products = this.store.selectSignal(selectFilteredList)
  isOpen = this.store.selectSignal(selectSidePanelOpened)
  filters = this.store.selectSignal<ShopFilters>(selectShopFiltersState);

  ngOnInit() {
    this.store.dispatch(ProductsActions.load())
  }

  addToCart(item: Product) {
    this.store.dispatch(CartActions.add({item}));
  }

  updateFilters(filters: Partial<ShopFilters>) {
    this.store.dispatch(ShopFiltersActions.update({filters}));
  }

  togglePanel() {
    this.store.dispatch(UiActions.toggleSidePanel())
  }

  closePanel() {
    this.store.dispatch(UiActions.closeSidePanel())
  }

}
