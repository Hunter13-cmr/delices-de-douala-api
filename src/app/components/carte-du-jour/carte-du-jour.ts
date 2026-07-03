import {
  Component,
  computed,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MenuService } from '../../services/menu.service';
import { RestaurantService } from '../../services/restaurant.service';
import { RatingService } from '../../services/rating.service';
import { environment } from '../../../environments/environment';
import { Plat } from '../../models/plat';

/**
 * CarteDuJourComponent - Affiche le menu d'un restaurant spécifique
 * Fonctionnalités :
 * - Chargement depuis /api/plats.json avec httpResource
 * - Gestion 3 états : chargement, erreur, données
 * - Filtre par catégorie avec signal + computed
 * - Plat du jour qui tourne automatiquement (interval RxJS → toSignal)
 * - Recherche par nom (bonus)
 * - Badge "épuisé" pour les plats indisponibles (bonus)
 * - Affiche le nom, l'image, le quartier et la note moyenne du restaurant dans le header
 */
@Component({
  selector: 'app-carte-du-jour',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './carte-du-jour.html',
  styleUrl: './carte-du-jour.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarteDuJourComponent {
  private readonly menuService = inject(MenuService);
  private readonly restaurantService = inject(RestaurantService);
  private readonly ratingService = inject(RatingService);
  private readonly route = inject(ActivatedRoute);

  // Récupère l'ID du restaurant depuis l'URL
  readonly restaurantId = Number(this.route.snapshot.paramMap.get('id'));

  // Ressource HTTP pour le menu
  readonly menu = this.menuService.menu;

  // Ressource HTTP pour les restaurants
  readonly restaurantsRes = this.restaurantService.restaurants;

  // Restaurant courant (depuis l'API)
  readonly restaurant = computed(() => {
    return this.restaurantService.getRestaurantById(this.restaurantId);
  });

  // Note moyenne du restaurant (depuis toutes les notes soumises)
  readonly restaurantRating = computed(() => {
    return this.ratingService.getAverageRating(this.restaurantId);
  });

  // Note arrondie pour l'affichage des étoiles
  readonly restaurantRatingRounded = computed(() => {
    return Math.round(this.restaurantRating());
  });

  // Signal pour la catégorie sélectionnée
  readonly selectedCategory = signal<string>('Toutes');

  // Signal pour la recherche
  readonly searchQuery = signal<string>('');

  // Catégories disponibles
  readonly categories = signal<string[]>([
    'Toutes',
    'Plats',
    'Grillades',
    'Végétarien',
    'Boissons',
  ]);

  /**
   * Plat du jour : extrait du menu filtré par restaurant, change toutes les 5 secondes
   * Utilise interval RxJS converti en Signal avec toSignal()
   */
  readonly platDuJourIndex = toSignal(
    interval(environment.refreshInterval).pipe(
      map((tick) => {
        const plats = this.platsDuRestaurant();
        return plats.length > 0 ? tick % plats.length : 0;
      })
    ),
    { initialValue: 0 }
  );

  readonly platDuJour = computed(() => {
    const plats = this.platsDuRestaurant();
    const index = this.platDuJourIndex();
    return plats.length > 0 ? plats[index] : null;
  });

  /**
   * Plats filtrés par restaurant
   */
  readonly platsDuRestaurant = computed(() => {
    const plats = this.menu.value() || [];
    return plats.filter((p) => p.restaurantId === this.restaurantId);
  });

  /**
   * Liste filtrée des plats
   * Computed : dépend du menu filtré, de la catégorie et de la recherche
   */
  readonly platsFiltres = computed(() => {
    const plats = this.platsDuRestaurant();
    const category = this.selectedCategory();
    const search = this.searchQuery().toLowerCase();

    return plats.filter((plat) => {
      const matchCategory =
        category === 'Toutes' || plat.categorie === category;
      const matchSearch =
        search === '' || plat.nom.toLowerCase().includes(search);
      return matchCategory && matchSearch;
    });
  });

  /**
   * Plats disponibles uniquement (bonus)
   */
  readonly platsDisponibles = computed(() => {
    return this.platsFiltres().filter((p) => p.disponible);
  });

  /**
   * Compteur des plats affichés
   */
  readonly platCount = computed(() => this.platsFiltres().length);

  /**
   * Compteur des plats indisponibles
   */
  readonly platIndisponiblesCount = computed(() => {
    return this.platsFiltres().filter((p) => !p.disponible).length;
  });

  // Nom du restaurant depuis l'environnement
  readonly restaurantName = environment.restaurantName;

  /**
   * Change la catégorie sélectionnée
   */
  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }

  /**
   * Réinitialise les filtres et la recherche
   */
  resetFilters() {
    this.selectedCategory.set('Toutes');
    this.searchQuery.set('');
  }

  /**
   * Retourne les classes CSS pour un plat
   */
  getPlatClasses(plat: Plat): Record<string, boolean> {
    return {
      'plat-card': true,
      'plat-indisponible': !plat.disponible,
      'plat-disponible': plat.disponible,
    };
  }
}