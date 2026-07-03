import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <button class="theme-toggle" (click)="themeService.toggle()" [attr.aria-label]="'Basculer en mode ' + (themeService.theme() === 'light' ? 'sombre' : 'clair')">
      {{ themeService.theme() === 'light' ? '🌙' : '☀️' }}
    </button>
    <router-outlet></router-outlet>
    <footer class="app-footer">
      <p>&copy; {{ currentYear }} {{ restaurantName }} - Tous droits réservés</p>
      <p class="footer-email">📧 contact&#64;delicesdedouala.cm</p>
    </footer>
  `,
})
export class App {
  readonly themeService = inject(ThemeService);
  readonly restaurantName = environment.restaurantName;
  readonly currentYear = new Date().getFullYear();
}