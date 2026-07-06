import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { Restaurant } from '../models/restaurant';

/**
 * SeoService - Gère les balises meta dynamiques pour le SEO
 * Met à jour le title et les meta descriptions pour chaque page/restaurant
 */
@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly defaultTitle = 'Délices de Douala';
  private readonly defaultDescription =
    'Découvrez et notez les meilleurs restaurants de Douala. Explorez les spécialités camerounaises et trouvez votre prochain restaurant préféré.';

  /**
   * Initialise les meta tags par défaut pour la page d'accueil
   */
  initDefaultMeta(): void {
    this.title.setTitle(this.defaultTitle);
    this.meta.updateTag({ name: 'description', content: this.defaultDescription });
    this.meta.updateTag({ name: 'og:title', content: this.defaultTitle });
    this.meta.updateTag({
      name: 'og:description',
      content: this.defaultDescription,
    });
    this.meta.updateTag({ name: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }

  /**
   * Met à jour les meta tags pour un restaurant spécifique
   */
  setRestaurantMeta(restaurant: Restaurant): void {
    const title = `${restaurant.name} - ${this.defaultTitle}`;
    const description = `Découvrez le menu de ${restaurant.name} situé à ${restaurant.district}. Spécialité : ${restaurant.specialty}. Notez et explorez leurs plats traditionnels camerounais.`;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'og:title', content: title });
    this.meta.updateTag({ name: 'og:description', content: description });
    this.meta.updateTag({ name: 'og:type', content: 'restaurant' });
    this.meta.updateTag({ name: 'og:image', content: restaurant.image });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: restaurant.image });

    // Meta tags supplémentaires pour le référencement local
    this.meta.updateTag({ name: 'geo.region', content: 'CM-LT' });
    this.meta.updateTag({ name: 'geo.placename', content: restaurant.district });
  }

  /**
   * Met à jour les meta tags pour la page 404
   */
  setNotFoundMeta(): void {
    const title = `Page non trouvée - ${this.defaultTitle}`;
    const description =
      'La page que vous recherchez n\'existe pas. Retournez à l\'accueil pour découvrir les restaurants de Douala.';

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'og:title', content: title });
    this.meta.updateTag({ name: 'og:description', content: description });
  }
}