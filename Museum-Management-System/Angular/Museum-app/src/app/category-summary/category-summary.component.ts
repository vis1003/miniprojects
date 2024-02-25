import { Component } from '@angular/core';
import { AllDataService } from '../services/all-data.service';

@Component({
  selector: 'app-category-summary',
  templateUrl: './category-summary.component.html',
  styles: ``
})
export class CategorySummaryComponent {
  constructor(
    private categorySummary:AllDataService
  ) { }

  categorySummaryData: any=[]

  ngOnInit(): void {
    this.categorySummary.getCategorySummary().subscribe((allData) => {
      console.log(allData);
      this.categorySummaryData = allData
    });
  }
}
