import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllDataService {
  url = "http://localhost:3000/";
  constructor(private http:HttpClient) { }
  getAllData(entity: string){
    return this.http.get(this.url+entity+'/fetch')
  }
  saveData(data: any, entity:string){
    console.log(data);
    return this.http.post(this.url+entity+'/add',data)
  }
}