import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  constructor(private http:HttpClient) { }
  
  getAllPriority(){
      // Modify the API URL and Method --> Go to constants folder
      return this.http.get(`${Constant.API_URL}${Constant.API_PRIORITY_METHODS.GET_ALL_PRIORITY}`)
    }
}
