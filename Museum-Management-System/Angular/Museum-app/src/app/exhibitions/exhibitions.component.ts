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

  editExhibition = new FormGroup({
    exhibition_id: new FormControl(''),
    exhibition_name: new FormControl(''),
    exhibition_start_date: new FormControl(''),
    exhibition_end_date: new FormControl(''),
    exhibition_location: new FormControl('')
  });

  editExhibitionId: any = null;
  errorMessage: string | null = null;
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
      this.errorMessage = "Please Enter All Data!";
      return;
    }
    console.log(formData);
    this.exhibition.saveData(formData,'exhibition').subscribe((result)=>{
      console.log(result);
      if (result == "Exhibition start date must be before the end date")
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

  deleteData(exhibition_id : any){
    console.log(exhibition_id);
    var check = confirm("Are you sure you want to delete Exhibition "+exhibition_id+"?")
    if(check){
      this.exhibition.deleteData(exhibition_id,'exhibition').subscribe((result)=>{
        console.log(result);
      });
      window.location.reload();
    }
  }
  
  editDataBtn(exhibition_id : any){
    console.log(exhibition_id);
    this.editExhibitionId = exhibition_id;
    this.exhibition.getDataByID('exhibition',exhibition_id).subscribe((result:any)=>{
  
      const formData = this.editExhibition.value;
      console.log(result['data'])
      
      this.editExhibition = new FormGroup({
        exhibition_id: new FormControl(result['data'][0].exhibition_id),
        exhibition_name: new FormControl(result['data'][0].name),
        exhibition_start_date: new FormControl(result['data'][0].start_date),
        exhibition_end_date: new FormControl(result['data'][0].end_date),
        exhibition_location: new FormControl(result['data'][0].location)
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
    let exhibition_id = this.editExhibitionId;
    console.log(this.editExhibition.value);
    
    const formData = this.editExhibition.value;
    formData.exhibition_id = this.exhibitionData['data'].length+1
    if (
      formData.exhibition_id === "" || 
      formData.exhibition_name === "" ||  
      formData.exhibition_start_date === "" || 
      formData.exhibition_end_date === "" ||
      formData.exhibition_location === ""
    ) {
      this.errorMessage = "Please Enter All Data!";
      return;
    }
    console.log(formData);
    this.exhibition.updateData(formData,'exhibition',exhibition_id).subscribe((result)=>{
      console.log(result);
      if (result == "Exhibition start date must be before the end date")
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