import { Injectable } from '@angular/core';
import { HttpService } from '../../../http.service';



@Injectable({
  providedIn: 'root'
})

/* Service that allows access to all artifactview component functions dealing with api */
export class ResultViewService {


  API_URL = 'https://6261636b656e64.live/api';

  constructor(private httpClient: HttpService) { }

  getComment(){
    return this.httpClient.get(`${this.API_URL}/comment/userResult`);
  }

}
