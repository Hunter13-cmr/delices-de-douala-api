import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Restaurant } from '../models/restaurant';

/**
 * RestaurantService - Charge la liste des restaurants depuis l'API
 * Utilise httpResource pour la lecture (GET)
 */
@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private readonly baseUrl = `${environment.serverUrl}/api/restaurants.json`;

  /**
   * Ressource HTTP pour les restaurants
   * Expose : .value() (données), .isLoading(), .error(), .status(), .reload()
   */
  readonly restaurants = httpResource<Restaurant[]>(() => this.baseUrl);

  /**
   * Récupère un restaurant par son ID
   */
  getRestaurantById(id: number): Restaurant | undefined {
    const list = this.restaurants.value();
    if (!list) return undefined;
    return list.find((r) => r.id === id);
  }
}