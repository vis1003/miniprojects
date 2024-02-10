import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ArtifactsComponent } from './artifacts/artifacts.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { CuratorsComponent } from './curators/curators.component';
import { ArtistsComponent } from './artists/artists.component';
import { CategoriesComponent } from './categories/categories.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ArtifactsComponent,
    ExhibitionsComponent,
    CuratorsComponent,
    ArtistsComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
