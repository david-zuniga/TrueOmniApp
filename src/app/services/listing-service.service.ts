import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListingDTO } from '../interfaces/listing.interface';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private apiURL = environment.apiURL
  
  constructor( private http: HttpClient ) {
    
  }

  public getAllListingData(): Observable<ListingDTO[]> {
    return this.http.get<ListingDTO[]>(this.apiURL)
  }
}
