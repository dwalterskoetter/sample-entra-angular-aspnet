import { Component, inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { WeatherforecastService } from '../services/weatherforecast.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private authService = inject(MsalService);
  private weatherService = inject(WeatherforecastService);
    
    userName = this.authService.instance.getAllAccounts()[0]?.name || 'Unbekannt';

    loadWeather() {
      this.weatherService.getWeatherForecast().subscribe({
        next: (data) => {
          console.log('Weather Data:', data);
        },
        error: (error) => {
          console.error('API Error:', error);
        }
      });
    }

    logout() {
      this.authService.logoutRedirect();
    }
  }