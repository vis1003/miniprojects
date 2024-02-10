import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';

@Component({
  selector: 'app-exhibitions',
  template: `
  <p class="title is-2" style="padding: 1%;">Exhibitions</p>

  <table class="table is-hoverable is-bordered" style="margin: 1%;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Exhibition Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of exhibitionData['data']">
          <td>{{item.exhibition_id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.start_date}}</td>
          <td>{{item.end_date}}</td>
          <td>{{item.location}}</td>
        </tr>
      </tbody>
    </table>
  `,
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