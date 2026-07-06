import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with showBestOnly set to false', () => {
    expect(component.showBestOnly()).toBe(false);
  });

  it('should toggle showBestOnly filter', () => {
    component.toggleFilter();
    expect(component.showBestOnly()).toBe(true);
    component.toggleFilter();
    expect(component.showBestOnly()).toBe(false);
  });

  it('should render the header component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('app-header');
    expect(header).toBeTruthy();
  });

  it('should render the restaurant list component when data loaded', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const list = compiled.querySelector('app-restaurant-list');
    expect(list).toBeTruthy();
  });

  it('should show filter button with correct text when showBestOnly is false', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const filterBtn = compiled.querySelector('.filter-btn');
    expect(filterBtn?.textContent).toContain('Restaurants ≥ 4★');
  });

  it('should show filter button with correct text when showBestOnly is true', () => {
    component.toggleFilter();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const filterBtn = compiled.querySelector('.filter-btn');
    expect(filterBtn?.textContent).toContain('Tout afficher');
  });
});