import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>

    <router-outlet />
  `,
  styles: []
})
export class AppComponent {
  title = 'Museum-app';
}
