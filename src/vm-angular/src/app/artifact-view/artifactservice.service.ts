import { Injectable } from '@angular/core';
import { HttpService} from '../http.service';

@Injectable({
  providedIn: 'root'
})

/* Service that allows access to all artifactview component functions dealing with api */
export class ArtifactserviceService {

  API_URL = 'https://virtual-mystery.6261636b656e64.live/api';
  ASSETS_URL = 'https://virtual-mystery.6261636b656e64.live/static/mystery';

  constructor(private httpClient: HttpService) { }

  getData(release: number) {
    // sends a request for a specific release and recieves release info
    return this.httpClient.get(`${this.API_URL}/mystery/release/${release}`)
  }

}
