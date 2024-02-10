import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';

@Component({
  selector: 'app-artists',
  template: `
    <p class="title is-2" style="padding: 1%;">Artists</p>

    <table class="table" style="margin: 2%;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Artist Name</th>
          <th>Nationality</th>
          <th>Birth Year</th>
          <th>Death Year</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of artistData['data']">
          <td>{{item.artist_id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.nationality}}</td>
          <td>{{item.birth_year}}</td>
          <td>{{item.death_year}}</td>
        </tr>
      </tbody>
    </table>

  `,
  styles: ``
})
export class ArtistsComponent implements OnInit{

  constructor(private artist:AllDataService){}
  artistData: any=[];
  ngOnInit(): void {
    this.artist.getAllData('artist').subscribe((allData)=>{
      console.log(allData)
      this.artistData = allData;
    });
  }

}
