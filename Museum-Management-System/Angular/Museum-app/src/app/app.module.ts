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
import { ReactiveFormsModule } from '@angular/forms';
import { ArtifactExhibitionComponent } from './artifact-exhibition/artifact-exhibition.component';
import { CategorySummaryComponent } from './category-summary/category-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ArtifactsComponent,
    ExhibitionsComponent,
    CuratorsComponent,
    ArtistsComponent,
    CategoriesComponent,
    ArtifactExhibitionComponent,
    CategorySummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
