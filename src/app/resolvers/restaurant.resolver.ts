import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { SeoService } from '../services/seo.service';

/**
 * RestaurantResolver - Charge les données d'un restaurant avant d'afficher la page
 * Résout le restaurant à partir de l'ID dans l'URL
 * Met à jour les meta tags SEO automatiquement
 * Redirige vers 404 si le restaurant n'est pas trouvé
 */
export const restaurantResolver: ResolveFn<Restaurant | null> = (route) => {
  const restaurantService = inject(RestaurantService);
  const seoService = inject(SeoService);
  const router = inject(Router);

  const id = Number(route.paramMap.get('id'));
  const restaurant = restaurantService.getRestaurantById(id);

  if (!restaurant) {
    seoService.setNotFoundMeta();
    router.navigate(['/not-found'], { skipLocationChange: true });
    return null;
  }

  // Met à jour les meta tags SEO pour ce restaurant
  seoService.setRestaurantMeta(restaurant);

  return restaurant;
};

/**
 * RestaurantsResolver - Charge la liste des restaurants avant l'affichage
 * et initialise les meta tags par défaut
 */
export const restaurantsResolver: ResolveFn<boolean> = () => {
  const seoService = inject(SeoService);
  seoService.initDefaultMeta();
  return true;
};