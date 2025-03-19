import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

   constructor(private http:HttpClient) { }
  
    getAllStatus(){
        // Modify the API URL and Method --> Go to constants folder
        return this.http.get(`${Constant.API_URL}${Constant.API_STATUS_METHODS.GET_ALL_STATUS}`)
      }
}
