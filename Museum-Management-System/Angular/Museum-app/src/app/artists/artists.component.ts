import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styles: ``
})
export class ArtistsComponent implements OnInit{

  constructor(
    private artist:AllDataService,
    private http: HttpClient
  ) { }

  addArtist = new FormGroup({
    artist_id: new FormControl(''),
    artist_name: new FormControl(''),
    artist_nationality: new FormControl(''),
    artist_birth_year: new FormControl(''),
    artist_death_year: new FormControl('')
  });

  artistData: any=[];

  ngOnInit(): void {
    this.artist.getAllData('artist').subscribe((allData)=>{
      console.log(allData)
      this.artistData = allData;
    });

    //Modal class functionality for Add Button
    const addButton = document.querySelector('#add_btn');
    const modalBg = document.querySelector('.modal-background');
    const modal = document.querySelector('.modal');
    if (addButton === null || modal === null) {
      alert('NULL');
    } else {
      addButton.addEventListener('click', () => {
        modal.classList.add('is-active');
      });

      modalBg?.addEventListener('click', () => {
        modal.classList.remove('is-active');
      })
    }
  }

  SaveData() {
    const formData = this.addArtist.value;
    formData.artist_id = this.artistData['data'].length+1
    if (
      formData.artist_id === "" || 
      formData.artist_name === "" || 
      formData.artist_nationality === "" || 
      formData.artist_birth_year === "" || 
      formData.artist_death_year === "" 
    ) {
      alert("Please Enter All Data!");
    }
    console.log(formData);
    this.artist.saveData(formData,'artist').subscribe((result)=>{
      console.log(result);
    });
  }  
}

