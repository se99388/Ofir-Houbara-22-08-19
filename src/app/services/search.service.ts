import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(private httpClient: HttpClient) { }

    public getSearchByCity(city: string): Observable<any> {
        return this.httpClient.get<any>("https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=jBGhMi9zBigHKXYx4ZQVm0ApZoGAbiHX&q=" + city);
    }




}
