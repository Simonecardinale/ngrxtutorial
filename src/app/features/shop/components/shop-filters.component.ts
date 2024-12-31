import {Component, effect, inject, input, output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe, NgClass} from '@angular/common';
import {Store} from '@ngrx/store';
import {debounceTime} from 'rxjs';
import {ShopFilters} from '../../../model/shop-filters';

@Component({
  selector: 'app-shop-filters',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgClass],
  template: `
    <div
      class="fixed w-96 top-0 right-0 h-full bg-slate-700 z-10 shadow-lg transition-all"
      [ngClass]="{
    'right-0': isOpen(),
    '-right-96': !isOpen(),
  }"
    >
      <form [formGroup]="form" class="flex flex-col gap-4 m-6">
        <div class="flex justify-between">
          <h1 class="text-2xl font-bold">FILTERS</h1>
          <button (click)="close.emit()">❌</button>
        </div>
        <!-- INPUT TEXT -->
        <input formControlName="text" type="text" placeholder="Search here" class="input input-bordered w-full" />


        <!-- RANGE: COST FILTER -->
        <label class="font-bold">MAX PRICE  (€ 0)</label>
        <input formControlName="cost" type="range" min="2" max="10" value="10" class="range" step="2" />
        <div class="w-full flex justify-between text-xs px-2">
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
          <span>|</span>
        </div>

        <br>

        <!--CHECKBOXES: MATERIALs -->
        <label class="font-bold">MATERIAL</label>

        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Wood</span>
            <input formControlName="wood" type="checkbox" checked="checked" class="checkbox" />
          </label>
        </div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Plastic</span>
            <input formControlName="plastic" type="checkbox" checked="checked" class="checkbox" />
          </label>
        </div>

        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">Paper</span>
            <input formControlName="paper" type="checkbox" checked="checked" class="checkbox" />
          </label>
        </div>

      </form>

      <pre>{{ form.value | json }}</pre>

    </div>
  `,
  styles: ``
})
export class ShopFiltersComponent {

  constructor() {
    effect(() => {
      const filters = this.filters();
      if(filters) {
        this.form.patchValue(filters, {emitEvent: false});
      }
    })

    this.form.valueChanges
      .pipe(
        debounceTime(1000),
      )
      .subscribe((value) => {
        this.changeFilters.emit(this.form.value);
    })
  }

  store = inject(Store);
  fb = inject(FormBuilder);

  changeFilters = output<Partial<ShopFilters>>();
  isOpen = input.required();
  close = output()
  filters = input.required<ShopFilters>();

  form = this.fb.nonNullable.group({
    text: '',       // initialized to an empty string
    cost: 2,        // initialized to 2
    wood: true,     // initialized to true
    plastic: true,  // initialized to true
    paper: false    // initialized to false
  })

}
