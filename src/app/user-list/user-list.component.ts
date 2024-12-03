import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User, Weather } from '../models';
import weatherCodes from "../assets/weatherCodes.json"
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

export class UserListComponent implements OnInit {
  users: (User & {weather?: Weather})[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get('https://randomuser.me/api/?results=5').subscribe((response: any) => {
      this.users = response.results;
      this.fetchWeather();
    });
  }

  fetchWeather(): void {
    this.users.forEach((user) => {
      const lat = user.location.coordinates.latitude;
      const lon = user.location.coordinates.longitude;

      this.http
        .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .subscribe((weather: any) => {
          user.weather = {
            temperature: weather.current_weather.temperature,
            imgUrl: this.getWeatherImage(weather.current_weather.weathercode),
          }

        });
    });
  }

  getWeatherImage(weathercode: number): string {
    const strCode = weathercode.toString()
    const codes: Record<string, WeatherCode> = weatherCodes;

    if (codes[strCode] === undefined) {
      return ""
    }
    
    return codes[strCode].day.image
  }
}

interface WeatherCode {
  day: {
    description: string;
    image: string;
  };
  night: {
    description: string;
    image: string;
  };
}
