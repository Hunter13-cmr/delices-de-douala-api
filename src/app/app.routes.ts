import { Routes } from '@angular/router';
import { restaurantsResolver, restaurantResolver } from './resolvers/restaurant.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home').then((m) => m.HomeComponent),
    resolve: {
      restaurants: restaurantsResolver,
    },
    title: 'Délices de Douala',
  },
  {
    path: 'restaurant/:id',
    loadComponent: () =>
      import('./components/carte-du-jour/carte-du-jour').then(
        (m) => m.CarteDuJourComponent
      ),
    resolve: {
      restaurant: restaurantResolver,
    },
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./components/not-found/not-found').then(
        (m) => m.NotFoundComponent
      ),
    title: 'Page non trouvée - Délices de Douala',
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];
