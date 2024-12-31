import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {NavBarComponent} from './core/components/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  template: `
    <app-nav-bar />

    <div class="max-w-screen-xl mx-6 xl:mx-auto">
      <router-outlet />
    </div>
  `,
  styles: [],
})
export class AppComponent { }
