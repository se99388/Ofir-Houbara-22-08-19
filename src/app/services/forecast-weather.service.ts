import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { ForecastDetails } from '../models/forecastDetails';
import { ActionType } from '../redux/action';
import { ErrMessageService } from './err-message.service';
import { Error } from '../models/err';

@Injectable({
    providedIn: 'root'
})
export class ForecastWeatherService {
    public forecastDetails: ForecastDetails[];
    public errMessage = new Error()
    constructor(private httpClient: HttpClient, private redux: NgRedux<Store>, private errMessageService: ErrMessageService) { }

    public getForecastWeatherByCityId(cityId: number, isCelsius): void {

         this.httpClient.get<any>("http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + cityId + "?apikey=jBGhMi9zBigHKXYx4ZQVm0ApZoGAbiHX&metric="+isCelsius).subscribe((defualtWeatherRes)=>{

            this.forecastDetails = defualtWeatherRes.DailyForecasts;

            const action = {
                type: ActionType.getForecastDetails,
                payload: this.forecastDetails
            }
            this.redux.dispatch(action);
        }, err => {
            this.errMessage.text = err.statusText;
            this.errMessage.message = err.message;
            this.errMessageService.openModal(this.errMessage);
        });
    }
}



