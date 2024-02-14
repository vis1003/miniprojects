import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
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
