import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-curators',
  templateUrl: './curators.component.html',
  styles: ``
})
export class CuratorsComponent implements OnInit{

  constructor(
    private curator:AllDataService,
    private http: HttpClient
  ) { }

  addCurator = new FormGroup({
    curator_id: new FormControl(''),
    curator_name: new FormControl(''),
    curator_email: new FormControl('')
  });

  curatorData: any=[];

  ngOnInit(): void {
    this.curator.getAllData('curator').subscribe((allData)=>{
      console.log(allData)
      this.curatorData = allData;
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
  const formData = this.addCurator.value;
  formData.curator_id = this.curatorData['data'].length+1
  if (
    formData.curator_id === "" || 
    formData.curator_name === "" || 
    formData.curator_email === ""
  ) {
    alert("Please Enter All Data!");
  }
  console.log(formData);
  this.curator.saveData(formData,'curator').subscribe((result)=>{
    console.log(result);
  });
  window.location.reload();
}  
}