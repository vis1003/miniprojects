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

  editArtist = new FormGroup({
    artist_id: new FormControl(''),
    artist_name: new FormControl(''),
    artist_nationality: new FormControl(''),
    artist_birth_year: new FormControl(''),
    artist_death_year: new FormControl('')
  });

  editArtistId: any = null;
  errorMessage: string | null = null;

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
      this.errorMessage = "Please Enter All Data!";
      return;
    }
    console.log(formData);
    this.artist.saveData(formData,'artist').subscribe((result)=>{
      console.log(result);
    });
    window.location.reload();
  }
  
  deleteData(artist_id : any){
    console.log(artist_id);
    var check = confirm("Are you sure you want to delete Artist "+artist_id+"?")
    if(check){
      this.artist.deleteData(artist_id,'artist').subscribe((result)=>{
        console.log(result);
      });
      window.location.reload();
    }
  }

  editDataBtn(artist_id : any){
    console.log(artist_id);
    this.editArtistId = artist_id;
    this.artist.getDataByID('artist',artist_id).subscribe((result:any)=>{

      const formData = this.editArtist.value;
      console.log(result['data'])
      
      this.editArtist = new FormGroup({
        artist_id: new FormControl(result['data'][0].artist_id),
        artist_name: new FormControl(result['data'][0].name),
        artist_nationality: new FormControl(result['data'][0].nationality),
        artist_birth_year: new FormControl(result['data'][0].birth_year),
        artist_death_year: new FormControl(result['data'][0].death_year)
      });
    });

    const modal = document.querySelector('#modal-edit');
    const modalBg = document.querySelector('#edit_background');
    if (modal) {
      modal.classList.add('is-active');
      modalBg?.addEventListener('click', () => {
        modal.classList.remove('is-active');
      })
    }
  }

  editData() {
    let artist_id = this.editArtistId;
    console.log(this.editArtist.value);
    
    const formData = this.editArtist.value;
    formData.artist_id = this.artistData['data'].length+1
    if (
      formData.artist_id === "" || 
      formData.artist_name === "" || 
      formData.artist_nationality === "" || 
      formData.artist_birth_year === "" || 
      formData.artist_death_year === ""
    ) {
      this.errorMessage = "Please Enter All Data!";
      return;
    }
    console.log(formData);
    this.artist.updateData(formData, 'artist', artist_id).subscribe(
      (result) => {
        console.log(result);
        if (result == "Artist birth year must be before the death year")
        {
          this.errorMessage = result;
          return;
        }
        else
        {
          this.errorMessage = "";
           window.location.reload();
        }
      });
  }
}

