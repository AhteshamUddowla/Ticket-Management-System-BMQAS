import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getAllTickets(){
    // Modify the API URL and Method --> Go to constants folder
    return this.http.get(`${Constant.API_URL}${Constant.API_TICKET_METHODS.GET_ALL_TICKETS}`)
  }

  getTicketById(id:number){
    // Modify the API URL and Method --> Go to constants folder
    return this.http.get(`${Constant.API_URL}${Constant.API_TICKET_METHODS.GET_TICKET_BY_ID}${id}`)
  }

  createTicket(ticketObj:any){
    // Modify the API URL and Method --> Go to constants folder
    return this.http.post(`${Constant.API_URL}${Constant.API_TICKET_METHODS.CREATE_TICKET}`, ticketObj)
  }

  updateTicket(ticketObj:any){
    // Modify the API URL and Method --> Go to constants folder
    return this.http.post(`${Constant.API_URL}${Constant.API_TICKET_METHODS.UPDATE_TICKET}`, ticketObj)
  }

  deleteTicket(id:number){
    // Modify the API URL and Method --> Go to constants folder
    return this.http.delete(`${Constant.API_URL}${Constant.API_TICKET_METHODS.DELETE_TICKET}${id}`)
  }
}
