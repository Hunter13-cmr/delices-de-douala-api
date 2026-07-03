import { Injectable, inject, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Plat } from '../models/plat';

/**
 * MenuService - Centralise l'état du menu avec httpResource
 * État réactif avec signaux, lecture via httpResource
 */
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly baseUrl = `${environment.serverUrl}/api/plats.json`;

  /**
   * Signal pour la recherche par nom (bonus)
   */
  readonly searchQuery = signal<string>('');

  /**
   * Charge le menu depuis /api/plats.json avec httpResource
   * Expose : .value() (données), .isLoading(), .error(), .status(), .reload()
   */
  readonly menu = httpResource<Plat[]>(() => this.baseUrl);

  /**
   * Retourne les plats filtrés par restaurant
   */
  getPlatsByRestaurant(restaurantId: number): Plat[] {
    const plats = this.menu.value();
    if (!plats) return [];
    return plats.filter((p) => p.restaurantId === restaurantId);
  }
}