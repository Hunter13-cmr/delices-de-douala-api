import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { CarteDuJourComponent } from './components/carte-du-jour/carte-du-jour';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'restaurant/:id',
    component: CarteDuJourComponent,
  },
];