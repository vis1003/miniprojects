import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';

@Component({
  selector: 'app-artifact-exhibition',
  templateUrl: './artifact-exhibition.component.html',
  styles: ``
})
export class ArtifactExhibitionComponent {

  constructor(
    private artifactExhibition:AllDataService
  ) { }

    artifactExhibitionData: any=[]
    exhibitionData: any=[]
    exhibitionLength: any=null;
    tableList: any=[]

  ngOnInit(): void {

    this.artifactExhibition.getAllData('exhibition').subscribe((allData)=>{
      console.log(allData)
      this.exhibitionData = allData
      this.exhibitionLength = this.exhibitionData["data"].length;

      for (let i = 1; i <= this.exhibitionLength; i++) {
        this.artifactExhibition.getExhibitionData(i).subscribe((allData)=>{
        this.artifactExhibitionData = allData;
        this.tableList.push(this.artifactExhibitionData) 
        console.log(this.tableList)
        });
      }
    });
  }
}
