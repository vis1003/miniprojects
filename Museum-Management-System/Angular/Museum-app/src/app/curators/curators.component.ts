import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';

@Component({
  selector: 'app-curators',
  template: `
  <p class="title is-2" style="padding: 1%;">Curators</p>

  <table class="table is-hoverable is-bordered" style="margin: 1%;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Curator Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of curatorData['data']">
          <td>{{item.curator_id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.email_id}}</td>
        </tr>
      </tbody>
    </table>
  `,
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
