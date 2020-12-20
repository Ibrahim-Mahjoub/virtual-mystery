import { Injectable } from '@angular/core';
import { HttpService } from '../../../http.service';



@Injectable({
  providedIn: 'root'
})

/* Service that allows access to all artifactview component functions dealing with api */
export class ResultViewService {


  API_URL = '138.197.167.8/api';

  constructor(private httpClient: HttpService) { }

  getComment(){
    return this.httpClient.get(`${this.API_URL}/comment/userResult`);
  }

}
