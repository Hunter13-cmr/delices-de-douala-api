import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantListComponent } from './restaurant-list';
import { Restaurant } from '../../models/restaurant';

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Le Calao Doré',
    district: 'Akwa',
    specialty: 'Ndolé aux crevettes',
    image: '/images/ndole-crevettes.jpg',
    currentRating: 4.5,
  },
  {
    id: 2,
    name: 'Chez Madame Ngono',
    district: 'Bonapriso',
    specialty: 'Eru aux pieds de bœuf',
    image: '/images/eru-pieds-boeuf.jpg',
    currentRating: 3.8,
  },
];

describe('RestaurantListComponent', () => {
  let component: RestaurantListComponent;
  let fixture: ComponentFixture<RestaurantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('restaurants', mockRestaurants);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all restaurants', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('app-restaurant-card');
    expect(cards.length).toBe(2);
  });

  it('should display the first restaurant name', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Le Calao Doré');
  });

  it('should display the second restaurant name', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Chez Madame Ngono');
  });

  it('should forward restaurantRated event', () => {
    const emitSpy = vi.spyOn(component.restaurantRated, 'emit');
    const event = { restaurantId: 1, rating: 5 };
    component.onRestaurantRated(event);
    expect(emitSpy).toHaveBeenCalledWith(event);
  });

  it('should update when restaurants input changes', () => {
    const singleRestaurant: Restaurant[] = [
      {
        id: 3,
        name: 'La Fourchette Camerounaise',
        district: 'Bonanjo',
        specialty: 'Poulet DG',
        image: '/images/poulet-dg.jpg',
      },
    ];
    fixture.componentRef.setInput('restaurants', singleRestaurant);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('app-restaurant-card');
    expect(cards.length).toBe(1);
    expect(compiled.textContent).toContain('La Fourchette Camerounaise');
  });

  it('should handle empty restaurant list', () => {
    fixture.componentRef.setInput('restaurants', []);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('app-restaurant-card');
    expect(cards.length).toBe(0);
  });
});