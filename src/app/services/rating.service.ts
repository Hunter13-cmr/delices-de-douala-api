import { Injectable, signal } from '@angular/core';

export interface RatingsData {
  [restaurantId: number]: number[];
}

/**
 * RatingService - Centralise toutes les notes attribuées aux restaurants
 * Stocke un tableau de notes par restaurant pour calculer la moyenne
 */
@Injectable({
  providedIn: 'root',
})
export class RatingService {
  // Map des notes : { restaurantId: [note1, note2, ...] }
  private readonly _ratings = signal<RatingsData>({});

  // Exposition en lecture seule
  readonly ratings = this._ratings.asReadonly();

  /**
   * Ajoute une note pour un restaurant
   */
  addRating(restaurantId: number, rating: number): void {
    this._ratings.update((ratings) => {
      const current = ratings[restaurantId] || [];
      return {
        ...ratings,
        [restaurantId]: [...current, rating],
      };
    });
  }

  /**
   * Calcule la moyenne des notes pour un restaurant
   * Retourne 0 si aucune note
   */
  getAverageRating(restaurantId: number): number {
    const ratings = this._ratings()[restaurantId];
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((sum, r) => sum + r, 0);
    return Number((total / ratings.length).toFixed(1));
  }

  /**
   * Nombre total de notes (tous restaurants confondus)
   */
  get totalRatingsCount(): number {
    return Object.values(this._ratings()).reduce(
      (sum, ratingsArray) => sum + ratingsArray.length,
      0
    );
  }

  /**
   * Note moyenne globale
   */
  get globalAverageRating(): number {
    const allRatings = Object.values(this._ratings()).flat();
    if (allRatings.length === 0) return 0;
    const total = allRatings.reduce((sum, r) => sum + r, 0);
    return Number((total / allRatings.length).toFixed(1));
  }

  /**
   * Nombre de restaurants ayant reçu au moins une note
   */
  get restaurantsRatedCount(): number {
    return Object.keys(this._ratings()).filter(
      (id) => (this._ratings()[Number(id)] || []).length > 0
    ).length;
  }
}