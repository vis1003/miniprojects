import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styles: ``
})
export class ExhibitionsComponent implements OnInit{

  constructor(
    private exhibition:AllDataService,
    private http: HttpClient
  ) { }

  addExhibition = new FormGroup({
    exhibition_id: new FormControl(''),
    exhibition_name: new FormControl(''),
    exhibition_start_date: new FormControl(''),
    exhibition_end_date: new FormControl(''),
    exhibition_location: new FormControl('')
  });

  exhibitionData: any=[];

  ngOnInit(): void {
    this.exhibition.getAllData('exhibition').subscribe((allData)=>{
      console.log(allData)
      this.exhibitionData = allData;
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
    const formData = this.addExhibition.value;
    formData.exhibition_id = this.exhibitionData['data'].length+1
    if (
      formData.exhibition_id === "" || 
      formData.exhibition_name === "" ||  
      formData.exhibition_start_date === "" || 
      formData.exhibition_end_date === "" ||
      formData.exhibition_location === ""
    ) {
      alert("Please Enter All Data!");
    }
    console.log(formData);
    this.exhibition.saveData(formData,'exhibition').subscribe((result)=>{
      console.log(result);
    });
    window.location.reload();
  }  
}