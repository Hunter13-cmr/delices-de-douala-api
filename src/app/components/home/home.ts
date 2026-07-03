import { Component, computed, inject, signal } from '@angular/core';

import { HeaderComponent } from '../header/header';
import { RestaurantListComponent } from '../restaurant-list/restaurant-list';

import { RestaurantService } from '../../services/restaurant.service';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    RestaurantListComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  private readonly restaurantService = inject(RestaurantService);
  private readonly ratingService = inject(RatingService);

  // Ressource HTTP pour les restaurants (API)
  readonly restaurantsRes = this.restaurantService.restaurants;

  // Signal pour le filtre "meilleurs restaurants"
  readonly showBestOnly = signal(false);

  // Nombre de restaurants notés
  readonly ratedCount = computed(() => this.ratingService.restaurantsRatedCount);

  // Note moyenne globale
  readonly averageRating = computed(() => this.ratingService.globalAverageRating);

  // Liste filtrée et triée
  readonly filteredRestaurants = computed(() => {
    const list = this.restaurantsRes.value() || [];

    // Ajoute la moyenne des notes aux restaurants pour l'affichage
    const withRatings = list.map((r) => ({
      ...r,
      currentRating: this.ratingService.getAverageRating(r.id),
    }));

    if (this.showBestOnly()) {
      return withRatings
        .filter((r) => r.currentRating >= 4)
        .sort((a, b) => b.currentRating - a.currentRating);
    }

    return withRatings.sort((a, b) => b.currentRating - a.currentRating);
  });

  // Mise à jour de la note d'un restaurant
  updateRestaurantRating(event: { restaurantId: number; rating: number }) {
    this.ratingService.addRating(event.restaurantId, event.rating);
  }

  // Activer/Désactiver le filtre
  toggleFilter() {
    this.showBestOnly.update((value) => !value);
  }
}