import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services/all-data.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styles: ``
})
export class ArtifactsComponent implements OnInit{

  constructor(private artifact:AllDataService){}
  addArtifact = new FormGroup({
    name: new FormControl('')
});
  artifactData: any=[];
  artistData: any=[];
  ngOnInit(): void {
    this.artifact.getAllData('artifact').subscribe((allData)=>{
      console.log(allData)
      this.artifactData = allData;
    });

    //Modal class functionality for Add Button
    const addButton = document.querySelector('#add_btn');
    const modalBg = document.querySelector('.modal-background');
    const modal = document.querySelector('.modal');
     if(addButton === null || modal === null){
      alert('NULL');
     }
     else{
      addButton.addEventListener('click',() => {
        modal.classList.add('is-active');
      });

      modalBg?.addEventListener('click',() => {
        modal.classList.remove('is-active');
      })
    }
  }
  SaveData(){
    console.log(this.addArtifact.value)
  }
}