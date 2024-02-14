import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
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
