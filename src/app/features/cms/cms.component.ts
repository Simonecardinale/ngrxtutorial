import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../core/store/products/products.actions';
import {
  selectActive,
  selectHasError,
  selectIsPanelOpened,
  selectList,
  selectPending
} from '../../core/store/products/products.feature';
import {Product} from '../../model/products';

@Component({
  selector: 'app-cms',
  standalone: true,
  template: `

    <!--ERROR ALERT-->
    @if (error()) {
      <div class="alert alert-error">Server error</div>
    }


    <div class="flex items-center gap-1">
      <!--ADD-->
      <div class="m-6 cursor-pointer" (click)="openModalToAddProduct()">
        <svg
          width="30"
          viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#ffffff" stroke-width="1.5"
                  stroke-linecap="round"></path>
            <path
              d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
              stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path>
          </g>
        </svg>
      </div>

      <!--PENDING-->
      @if (pending()) {
        <span class="loading loading-spinner loading-md"></span>
      }
    </div>

    <!--FORM EDIT / ADD-->
    <dialog class="modal bg-black bg-opacity-85" [open]="isModalOpened()">
      <div class="modal-box">
        <h3 class="font-bold text-2lg m-3">
          ADD ITEM
        </h3>
        <form [formGroup]="form" (submit)="saveProduct()" class="flex flex-col gap-3">
          <input
            type="text" placeholder="Product name" class="input input-bordered w-full max-w-xs"
            formControlName="name"
          />
          <div class="flex gap-2">
            <button class="btn" type="button" (click)="closeModal()">Close</button>
            <button class="btn" type="submit" [disabled]="form.invalid">Save</button>
          </div>
        </form>
      </div>
    </dialog>

    <!--LIST-->
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
        <tr>
          <th>Preview</th>
          <th>Name</th>
          <th>Type</th>
          <th>Cost</th>
        </tr>
        </thead>

        <tbody>
          @for (product of products(); track product.id) {
            <tr
              (click)="openModalToEditProduct(product)"
              class="hover:bg-base-200 cursor-pointer"
            >
              <td>
                <img [src]="product.image" alt="" width="50">
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.type }}</td>
              <td>
                € {{ product.cost }}
                <button
                  class="btn ml-2"
                  (click)="deleteProduct(product)">Delete
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>

  `,
  imports: [
    ReactiveFormsModule
  ],
  styles: ``
})
export default class CmsComponent implements OnInit {
  store = inject(Store)
  fb = inject(FormBuilder)
  error = this.store.selectSignal(selectHasError);
  pending = this.store.selectSignal(selectPending);
  products = this.store.selectSignal(selectList);
  isModalOpened = this.store.selectSignal(selectIsPanelOpened);
  // NEW
  active = this.store.selectSignal(selectActive);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]]
  })

  ngOnInit() {
    this.store.dispatch(ProductsActions.load())
  }

  deleteProduct(product: Product) {
    this.store.dispatch(ProductsActions.deleteProduct({ id: product.id }))
  }

  openModalToAddProduct() {
    this.store.dispatch(ProductsActions.openModalAdd())
    this.form.reset()
  }

  // NEW
  openModalToEditProduct(product: Product) {
    this.store.dispatch(ProductsActions.openModalEdit({ item: product}))
    this.form.patchValue(product)
  }

  closeModal() {
    this.store.dispatch(ProductsActions.closeModal())
  }

  saveProduct() {
    if (this.active()) {
      this.editProduct()
    } else {
      this.addProduct()
    }
  }

  addProduct() {
    this.store.dispatch(ProductsActions.addProduct({ item: this.form.value}))
  }

  editProduct() {
    const editedProduct = {
      ...this.form.value,
      id: this.active()?.id
    }
    this.store.dispatch(ProductsActions.editProduct({ item: editedProduct }))
  }

}
