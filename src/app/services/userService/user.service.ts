import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
    getAllUsers(){
      // Modify the API URL and Method --> Go to constants folder
      return this.http.get(`${Constant.API_URL}${Constant.API_USER_METHODS.GET_ALL_USERS}`)
    }

    getUserByID(id:number){
      // Modify the API URL and Method --> Go to constants folder
      return this.http.get(`${Constant.API_URL}${Constant.API_USER_METHODS.GET_USER_BY_ID}${id}`)
    }

    updateUser(ticketObj:any){
      // Modify the API URL and Method --> Go to constants folder
      return this.http.post(`${Constant.API_URL}${Constant.API_USER_METHODS.UPDATE_USER}`, ticketObj)
    }

    deleteUser(id:number){
      // Modify the API URL and Method --> Go to constants folder
      return this.http.delete(`${Constant.API_URL}${Constant.API_USER_METHODS.DELETE_USER}${id}`)
    }
}
