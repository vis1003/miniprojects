import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';

@Component({
  selector: 'app-curators',
  templateUrl: './curators.component.html',
  styles: ``
})
export class CuratorsComponent implements OnInit{

  constructor(private curator:AllDataService){}
  curatorData: any=[];
  ngOnInit(): void {
    this.curator.getAllData('curator').subscribe((allData)=>{
      console.log(allData)
      this.curatorData = allData;
    });
  }

}
