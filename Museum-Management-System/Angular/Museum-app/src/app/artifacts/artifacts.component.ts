import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';

@Component({
  selector: 'app-artifacts',
  template: `
    <p class="title is-2" style="padding: 1%;">Artifacts</p>

    <table class="table is-hoverable is-bordered" style="margin: 1%;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Artifact Name</th>
          <th>Description</th>
          <th>Acquisition Date</th>
          <th>Condition</th>
          <th>Artist ID</th>
          <th>Category ID</th>
          <th>Curator ID</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of artifactData['data']">
          <td>{{item.artifact_id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.description}}</td>
          <td>{{item.acquisition_date}}</td>
          <td>{{item.artifact_condition}}</td>
          <td>{{item.artist_id}}</td>
          <td>{{item.category_id}}</td>
          <td>{{item.curator_id}}</td>
        </tr>
      </tbody>
    </table>
  `,
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