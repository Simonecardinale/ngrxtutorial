import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../core/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="form" class="flex flex-col gap-3 justify-center max-w-xs mx-auto mt-16">
      <input type="text" placeholder="Username" class="input input-bordered w-full " formControlName="username"/>
      <input type="password" placeholder="Password" class="input input-bordered w-full " formControlName="password" />
      <button class="btn max-w-xs" (click)="login()" [disabled]="form.invalid">LOGIN</button>
    </form>
  `,
  styles: ``
})
export default class LoginComponent {
  store = inject(Store)
  fb = inject(FormBuilder)
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  login() {
    this.store.dispatch(AuthActions.login({
      username: this.form.getRawValue().username,
      password: this.form.getRawValue().password
    }))
  }
}
