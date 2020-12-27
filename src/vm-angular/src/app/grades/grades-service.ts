import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';


@Injectable({
  providedIn: 'root'
})
export class GradesService {
  API_URL = 'https://virtual-mystery.6261636b656e64.live/api';

  constructor(private httpClient: HttpService) { }
  
  /*
  Returns a list of comments for the logged in user
  - Comment objects have their results
  - Sort Comments by release number
  */
  getGradesList(){
    return this.httpClient.get(`${this.API_URL}/comment/userGrades`);

  }

  
  
}