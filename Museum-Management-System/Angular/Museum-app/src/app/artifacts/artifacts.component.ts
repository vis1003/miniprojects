import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styles: ``
})
export class ArtifactsComponent implements OnInit {

  constructor(
    private artifact: AllDataService,
    private http: HttpClient
  ) { }

  addArtifact = new FormGroup({
    artifact_id: new FormControl(''),
    artifact_name: new FormControl(''),
    artifact_description: new FormControl(''),
    artifact_acquisition_date: new FormControl(''),
    artifact_condition: new FormControl(''),
    artist_id: new FormControl(''),
    category_id: new FormControl(''),
    curator_id: new FormControl('')
  });

  editArtifact = new FormGroup({
    artifact_id: new FormControl(''),
    artifact_name: new FormControl(''),
    artifact_description: new FormControl(''),
    artifact_acquisition_date: new FormControl(''),
    artifact_condition: new FormControl(''),
    artist_id: new FormControl(''),
    category_id: new FormControl(''),
    curator_id: new FormControl('')
  });
  
  artifactData: any = [];
  artistData: any = [];
  categoryData: any = [];
  curatorData: any = [];

  ngOnInit(): void {
    this.artifact.getAllData('artifact').subscribe((allData) => {
      console.log(allData)
      this.artifactData = allData;
    });

    // Fetching artist data
    this.http.get('http://localhost:3000/artist/fetch').subscribe(
      (response: any) => {
        this.artistData = response;
        console.log('Data:', this.artistData);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    // Fetching category data
    this.http.get('http://localhost:3000/category/fetch').subscribe(
      (response: any) => {
        this.categoryData = response;
        console.log('Data:', this.categoryData);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    // Fetching curator data
    this.http.get('http://localhost:3000/curator/fetch').subscribe(
      (response: any) => {
        this.curatorData = response;
        console.log('Data:', this.curatorData);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

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
    const formData = this.addArtifact.value;
    formData.artifact_id = this.artifactData['data'].length+1
    if (
      formData.artist_id === "" || 
      formData.category_id === "" || 
      formData.artifact_condition === "" || 
      formData.curator_id === "" || 
      formData.artifact_acquisition_date === "" || 
      formData.artifact_description === "" || 
      formData.artifact_name === ""
    ) {
      alert("Please Enter All Data!");
    }
    console.log(formData);
    this.artifact.saveData(formData,'artifact').subscribe((result)=>{
      console.log(result);
    });
    window.location.reload();
  }  

  deleteData(artifact_id : any){
    console.log(artifact_id);
    var check = confirm("Are you sure you want to delete Artifact "+artifact_id+"?")
    if(check){
      this.artifact.deleteData(artifact_id,'artifact').subscribe((result)=>{
        console.log(result);
      });
      window.location.reload();
    }
  }

  editDataBtn(artifact_id : any){
    console.log(artifact_id);
    this.artifact.getDataByID('artifact',artifact_id).subscribe((result:any)=>{

      const formData = this.editArtifact.value;
      console.log(result['data'])
      
      var artist_id = null;
      var category_id = null;
      var curator_id = null;

      for (let artist of this.artistData['data']) {
        if (artist.name === result['data'][0].artist_name) {
          artist_id = artist.artist_id;
          break;
        }
      }
      for (let curator of this.curatorData['data']) {
        if (curator.name === result['data'][0].curator_name) {
          curator_id = curator.curator_id;
          break;
        }
      }
      for (let category of this.categoryData['data']) {
        if (category.name === result['data'][0].category_name) {
          category_id = category.category_id;
          break;
        }
      }
      
      this.editArtifact = new FormGroup({
        artifact_id: new FormControl(result['data'][0].artifact_id),
        artifact_name: new FormControl(result['data'][0].artifact_name),
        artifact_description: new FormControl(result['data'][0].artifact_description),
        artifact_acquisition_date: new FormControl(result['data'][0].acquisition_date),
        artifact_condition: new FormControl(result['data'][0].artifact_condition),
        artist_id: new FormControl(artist_id),
        category_id: new FormControl(category_id),
        curator_id: new FormControl(curator_id)
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

  editData(artifact_id : any){
    console.log(this.editArtifact.value);
    
    const formData = this.editArtifact.value;
    formData.artifact_id = this.artifactData['data'].length+1
    if (
      formData.artist_id === "" || 
      formData.category_id === "" || 
      formData.artifact_condition === "" || 
      formData.curator_id === "" || 
      formData.artifact_acquisition_date === "" || 
      formData.artifact_description === "" || 
      formData.artifact_name === ""
    ) {
      alert("Please Enter All Data!");
    }
    console.log(formData);
    this.artifact.updateData(formData,'artifact',artifact_id).subscribe((result)=>{
      console.log(result);
    });
    window.location.reload();
  }
}
