import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <div class="navbar is-dark">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img src="">
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" routerLink="/">Home</a>
        <a class="navbar-item" routerLink="/artifacts">Artifacts</a>
        <a class="navbar-item" routerLink="/artists">Artists</a>
        <a class="navbar-item" routerLink="/curators">Curators</a>
        <a class="navbar-item" routerLink="/categories">Categories</a>
        <a class="navbar-item" routerLink="/exhibitions">Exhibitions</a>
      </div>
    </div>
  </div>
  `,
  styles: ``
})
export class HeaderComponent {

}
