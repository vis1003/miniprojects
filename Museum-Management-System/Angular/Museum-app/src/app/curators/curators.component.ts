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

  editCurator = new FormGroup({
    curator_id: new FormControl(''),
    curator_name: new FormControl(''),
    curator_email: new FormControl('')
  });

  editCuratorId: any = null;

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

deleteData(curator_id : any){
  console.log(curator_id);
  var check = confirm("Are you sure you want to delete Curator "+curator_id+"?")
  if(check){
    this.curator.deleteData(curator_id,'curator').subscribe((result)=>{
      console.log(result);
    });
    window.location.reload();
  }
}

editDataBtn(curator_id : any){
  console.log(curator_id);
  this.editCuratorId = curator_id;
  this.curator.getDataByID('curator',curator_id).subscribe((result:any)=>{

    const formData = this.editCurator.value;
    console.log(result['data'])
    
    this.editCurator = new FormGroup({
      curator_id: new FormControl(result['data'][0].curator_id),
      curator_name: new FormControl(result['data'][0].name),
      curator_email: new FormControl(result['data'][0].email_id)
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
  let curator_id = this.editCuratorId;
  console.log(this.editCurator.value);
  
  const formData = this.editCurator.value;
  formData.curator_id = this.curatorData['data'].length+1
  if (
    formData.curator_id === "" || 
    formData.curator_name === "" || 
    formData.curator_email === ""
  ) {
    alert("Please Enter All Data!");
  }
  console.log(formData);
  this.curator.updateData(formData,'curator',curator_id).subscribe((result)=>{
    console.log(result);
  });
  window.location.reload();
}
}