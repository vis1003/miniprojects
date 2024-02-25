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

  editCategory = new FormGroup({
    category_id: new FormControl(''),
    category_name: new FormControl(''),
    category_description: new FormControl('')
  });

  editCategoryId: any = null;
  errorMessage: string | null = null;
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
    this.errorMessage = "Please Enter All Data!";
    return;
  }
  console.log(formData);
  this.category.saveData(formData,'category').subscribe((result)=>{
    console.log(result);
  });
  window.location.reload();
  }  
  
  deleteData(category_id : any){
    console.log(category_id);
    var check = confirm("Are you sure you want to delete Category "+category_id+"?")
    if(check){
      this.category.deleteData(category_id,'category').subscribe((result)=>{
        console.log(result);
      });
      window.location.reload();
    }
  }

  editDataBtn(category_id : any){
    console.log(category_id);
    this.editCategoryId = category_id;
    this.category.getDataByID('category',category_id).subscribe((result:any)=>{

      const formData = this.editCategory.value;
      console.log(result['data'])
      
      this.editCategory = new FormGroup({
        category_id: new FormControl(result['data'][0].category_id),
        category_name: new FormControl(result['data'][0].name),
        category_description: new FormControl(result['data'][0].description)
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
    let category_id = this.editCategoryId;
    console.log(this.editCategory.value);
    
    const formData = this.editCategory.value;
    formData.category_id = this.categoryData['data'].length+1
    if (
      formData.category_id === "" || 
    formData.category_name === "" || 
    formData.category_description === ""
    ) {
      this.errorMessage = "Please Enter All Data!";
      return;
    }
    console.log(formData);
    this.category.updateData(formData,'category',category_id).subscribe((result)=>{
      console.log(result);
    });
    window.location.reload();
  }
}


