import { JsonPipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderUserForm } from '../../../model/order-user-form';

@Component({
  selector: 'app-user-info-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  template: `
    <!--USER FORM -->
    <section aria-labelledby="payment-and-shipping-heading" class="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pt-0 lg:pb-24">

      <form [formGroup]="form" (submit)="confirmOrder()">
        <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <div>
            <h3 id="contact-info-heading" class="text-lg font-medium text-gray-900">Contact information</h3>

            <div class="mt-6">
              <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
              <div class="mt-1">
                <input
                  formControlName="email"
                  type="email" id="email-address" name="email-address" autocomplete="email" class="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                >
              </div>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-lg font-medium text-gray-900">Shipping address</h3>

            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
              <div class="sm:col-span-3">
                <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                <div class="mt-1">
                  <input
                    formControlName="address"
                    type="text" id="address" name="address" autocomplete="street-address" class="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                  >
                </div>
              </div>

              <div>
                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                <div class="mt-1">
                  <input
                    formControlName="city"
                    type="text" id="city" name="city" autocomplete="address-level2" class="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                  >
                </div>
              </div>

              <div>
                <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                <div class="mt-1">
                  <input
                    formControlName="state"
                    type="text" id="region" name="region" autocomplete="address-level1" class="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                  >
                </div>
              </div>

              <div>
                <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal code</label>
                <div class="mt-1">
                  <input
                    formControlName="zip"
                    type="text" id="postal-code" name="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm"
                  >
                </div>
              </div>
            </div>
          </div>


          <div class="mt-10 flex justify-end border-t border-gray-200 pt-6">
            <button
              [disabled]="form.invalid"
              type="submit"
              class="rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-35"
            >
              Order now
            </button>
          </div>
        </div>
      </form>
    </section>

    <pre>{{form.value | json}}</pre>
  `,
  styles: ``
})
export class UserInfoFormComponent {
  fb = inject(FormBuilder)
  confirm = output<OrderUserForm>()

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
  })

  confirmOrder() {
    this.confirm.emit(this.form.value as OrderUserForm)
  }
}
