import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtifactsComponent } from './artifacts/artifacts.component';
import { ArtistsComponent } from './artists/artists.component';
import { CategoriesComponent } from './categories/categories.component';
import { CuratorsComponent } from './curators/curators.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { ArtifactExhibitionComponent } from './artifact-exhibition/artifact-exhibition.component';
import { CategorySummaryComponent } from './category-summary/category-summary.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'artifacts',
    component: ArtifactsComponent
  },
  {
    path: 'artists',
    component: ArtistsComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'curators',
    component: CuratorsComponent
  },
  {
    path: 'exhibitions',
    component: ExhibitionsComponent
  },
  {
    path: 'artifact-exhibition',
    component: ArtifactExhibitionComponent
  },
  {
    path: 'category-summary',
    component: CategorySummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
