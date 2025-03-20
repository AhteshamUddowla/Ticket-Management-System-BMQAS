import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }
  
    getAllFeedbacks(){
      // Modify the API URL and Method --> Go to constants folder
      return this.http.get(`${Constant.API_URL}${Constant.API_FEEDBACK_METHODS.GET_ALL_FEEDBACK}`)
    }
  
    createFeedback(feedbackObj:any){
      // Modify the API URL and Method --> Go to constants folder
      return this.http.post(`${Constant.API_URL}${Constant.API_FEEDBACK_METHODS.CREATE_FEEDBACK}`, feedbackObj)
    }
}
