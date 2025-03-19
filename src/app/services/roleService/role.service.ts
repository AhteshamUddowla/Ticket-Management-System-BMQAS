import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }
  
  getAllRoles(){
      // Modify the API URL and Method --> Go to constants folder
      return this.http.get(`${Constant.API_URL}${Constant.API_ROLE_METHODS.GET_ALL_ROLES}`)
    }
}
