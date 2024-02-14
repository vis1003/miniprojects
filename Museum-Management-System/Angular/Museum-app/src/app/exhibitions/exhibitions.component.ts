import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styles: ``
})
export class ExhibitionsComponent implements OnInit{

  constructor(private exhibition:AllDataService){}
  exhibitionData: any=[];
  ngOnInit(): void {
    this.exhibition.getAllData('exhibition').subscribe((allData)=>{
      console.log(allData)
      this.exhibitionData = allData;
    });
  }

}