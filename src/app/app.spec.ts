import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { ThemeService } from './services/theme.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the restaurant name from environment', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.restaurantName).toBeDefined();
    expect(app.restaurantName.length).toBeGreaterThan(0);
  });

  it('should have the current year', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.currentYear).toBe(new Date().getFullYear());
  });

  it('should inject ThemeService', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.themeService).toBeInstanceOf(ThemeService);
  });

  it('should render the theme toggle button', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const toggleBtn = compiled.querySelector('.theme-toggle');
    expect(toggleBtn).toBeTruthy();
    expect(toggleBtn?.getAttribute('aria-label')).toContain('Basculer');
  });

  it('should render the footer with copyright', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('.app-footer');
    expect(footer).toBeTruthy();
    expect(footer?.textContent).toContain('Tous droits réservés');
  });

  it('should render the router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const outlet = compiled.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });
});