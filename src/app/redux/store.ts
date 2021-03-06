import { CurrentWeatherDetails } from '../models/currentWeatherDetails';
import { ForecastDetails } from '../models/forecastDetails';

export class Store{
    public cityId: string;
    public currentWeatherDetails:CurrentWeatherDetails;
    public allFavoriteCities: CurrentWeatherDetails[]=[];
    public forecastDetails: ForecastDetails[];
    public isCelsius:boolean = true;
}
