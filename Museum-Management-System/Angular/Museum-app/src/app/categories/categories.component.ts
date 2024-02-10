import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';

@Component({
  selector: 'app-categories',
  template: `
  <p class="title is-2" style="padding: 1%;">Categories</p>

  <table class="table is-hoverable is-bordered" style="margin: 1%;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Category Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of categoryData['data']">
          <td>{{item.category_id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.description}}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: ``
})
export class CategoriesComponent implements OnInit{

  constructor(private category:AllDataService){}
  categoryData: any=[];
  ngOnInit(): void {
    this.category.getAllData('category').subscribe((allData)=>{
      console.log(allData)
      this.categoryData = allData;
    });
  }

}
