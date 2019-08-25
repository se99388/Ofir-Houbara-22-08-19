import { Injectable } from '@angular/core';
import { CurrentWeatherDetails } from '../models/currentWeatherDetails';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { ActionType } from '../redux/action';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    public isCelsius: boolean;
    public currentWeatherDetails: CurrentWeatherDetails;
    public cityDetails = new Array();
    constructor(private redux: NgRedux<Store>, private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

    public addCityToFavorites(favCity: CurrentWeatherDetails): void {
        console.log("favCity", favCity)
        const action = {
            type: ActionType.addFavoriteCity,
            payload: { ...favCity }
        }
        this.redux.dispatch(action);
        this.localStorageService.updateLocalStorage();
    }

    public removeCityFromFavorites(favCity: CurrentWeatherDetails): void {
        console.log("favCity", favCity)
        const action = {
            type: ActionType.deleteFavoriteCity,
            payload: { ...favCity }
        }
        this.redux.dispatch(action);
        this.localStorageService.updateLocalStorage();
    }

    public addAllFavoriteCities(favCities: CurrentWeatherDetails[]): void {
        console.log("favCity", favCities)
        const action = {
            type: ActionType.addAllFavoriteCities,
            payload: favCities
        }
        this.redux.dispatch(action);
    }

    public getCurrentWeatherOfFavCity(cityId):Observable<any> {

        this.isCelsius = this.redux.getState().isCelsius;
        //lizet
        // return this.httpClient.get<any>("http://dataservice.accuweather.com/currentconditions/v1/"+ cityId +"?apikey=uchRUwleT0NqUwf1HeNnke3AJKWALprI&metric="+ this.isCelsius)
        //ofir
        return this.httpClient.get<any>("http://dataservice.accuweather.com/currentconditions/v1/" + cityId + "?apikey=jeZErwCeBnkCeg2VqhYTMOchhcFIDnVp&metric="+ this.isCelsius);
        // return this.httpClient.get<any>("../../assets/jerusalem.json");
    }
}
