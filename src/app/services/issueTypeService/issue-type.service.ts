import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class IssueTypeService {

  constructor(private http:HttpClient) { }
  
  getAllIssueType(){
      // Modify the API URL and Method --> Go to constants folder
      return this.http.get(`${Constant.API_URL}${Constant.API_ISSUE_TYPE_METHODS.GET_ALL_ISSUE_TYPE}`)
    }
}
