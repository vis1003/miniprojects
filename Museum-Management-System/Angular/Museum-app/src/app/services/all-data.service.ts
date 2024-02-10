import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllDataService {
  url = "http://localhost:3000/";
  constructor(private http:HttpClient) { }
  getAllData(entity: string){
    this.url = this.url+entity
    return this.http.get(this.url)
  }
}