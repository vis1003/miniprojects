import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: ``
})
export class CategoriesComponent implements OnInit{

  constructor(
    private category:AllDataService,
    private http: HttpClient
  ) { }

  addCategory = new FormGroup({
    category_id: new FormControl(''),
    category_name: new FormControl(''),
    category_description: new FormControl('')
  });

  categoryData: any=[];

  ngOnInit(): void {
    this.category.getAllData('category').subscribe((allData)=>{
      console.log(allData)
      this.categoryData = allData;
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
  const formData = this.addCategory.value;
  formData.category_id = this.categoryData['data'].length+1
  if (
    formData.category_id === "" || 
    formData.category_name === "" || 
    formData.category_description === ""
  ) {
    alert("Please Enter All Data!");
  }
  console.log(formData);
  this.category.saveData(formData,'category').subscribe((result)=>{
    console.log(result);
  });
  window.location.reload();
}  
}


