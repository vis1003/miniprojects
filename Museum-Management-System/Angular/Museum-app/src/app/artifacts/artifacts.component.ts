import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styles: ``
})
export class ArtifactsComponent implements OnInit {

  constructor(
    private artifact: AllDataService,
    private http: HttpClient // Inject HttpClient here
  ) { }

  addArtifact = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(''),
    condition: new FormControl(''),
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
  
    if (
      formData.artist_id === "" || 
      formData.category_id === "" || 
      formData.condition === "" || 
      formData.curator_id === "" || 
      formData.date === "" || 
      formData.description === "" || 
      formData.name === ""
    ) {
      alert("Please Enter All Data!");
    }
    console.log(formData);
  }  
}
