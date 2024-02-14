import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styles: ``
})
export class ArtifactsComponent implements OnInit{

  constructor(private artifact:AllDataService){}
  artifactData: any=[];
  ngOnInit(): void {
    this.artifact.getAllData('artifact').subscribe((allData)=>{
      console.log(allData)
      this.artifactData = allData;
    });
  }

}