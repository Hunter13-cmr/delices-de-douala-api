import { Component, input, output } from '@angular/core';

import { Restaurant } from '../../models/restaurant';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [RestaurantCardComponent],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.css'
})
export class RestaurantListComponent {

  restaurants = input.required<Restaurant[]>();

  restaurantRated = output<{
    restaurantId:number;
    rating:number;
  }>();

  onRestaurantRated(event:{
    restaurantId:number;
    rating:number;
  }){
    this.restaurantRated.emit(event);
  }

}