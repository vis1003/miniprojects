import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  deleteData(id: any, entity: string){
    return this.http.delete(this.url+entity+'/delete/'+id)
  }
  getDataByID(entity: string, id: number){
    return this.http.get(this.url+entity+'/fetch/'+id)
  }
  updateData(data: any, entity: string, id: number) {
    return this.http.put(this.url + entity + '/update/' + id, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error);
        })
      );
  }
  getExhibitionData(id: number){
    return this.http.get(this.url+'artifact-exhibition/fetch/'+id)
  }
}