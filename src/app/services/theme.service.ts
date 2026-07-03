import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly _theme = signal<Theme>('light');

  readonly theme = this._theme.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme') as Theme | null;
      if (saved === 'dark' || saved === 'light') {
        this._theme.set(saved);
      }
    }
    this.applyTheme(this._theme());
  }

  toggle(): void {
    this._theme.update((t) => (t === 'light' ? 'dark' : 'light'));
    const current = this._theme();
    this.applyTheme(current);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', current);
    }
  }

  private applyTheme(t: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', t);
    }
  }
}