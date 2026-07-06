import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantCardComponent } from './restaurant-card';
import { Restaurant } from '../../models/restaurant';

const mockRestaurant: Restaurant = {
  id: 1,
  name: 'Le Calao Doré',
  district: 'Akwa',
  specialty: 'Ndolé aux crevettes',
  image: '/images/ndole-crevettes.jpg',
  currentRating: 4.5,
};

describe('RestaurantCardComponent', () => {
  let component: RestaurantCardComponent;
  let fixture: ComponentFixture<RestaurantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('restaurant', mockRestaurant);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the restaurant name', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Le Calao Doré');
  });

  it('should display the district', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Akwa');
  });

  it('should display the specialty', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Ndolé aux crevettes');
  });

  it('should display the restaurant image', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('/images/ndole-crevettes.jpg');
  });

  it('should have a link to the restaurant menu page', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');
    expect(link?.getAttribute('ng-reflect-router-link')).toBe('/restaurant,1');
  });

  it('should emit restaurantRated event when rating changes', () => {
    const emitSpy = vi.spyOn(component.restaurantRated, 'emit');
    component.onRatingChanged(4);
    expect(emitSpy).toHaveBeenCalledWith({
      restaurantId: 1,
      rating: 4,
    });
  });

  it('should render star-rating component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const starRating = compiled.querySelector('app-star-rating');
    expect(starRating).toBeTruthy();
  });

  it('should update when restaurant input changes', () => {
    const newRestaurant: Restaurant = {
      id: 2,
      name: 'Chez Madame Ngono',
      district: 'Bonapriso',
      specialty: 'Eru aux pieds de bœuf',
      image: '/images/eru-pieds-boeuf.jpg',
    };
    fixture.componentRef.setInput('restaurant', newRestaurant);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Chez Madame Ngono');
    expect(compiled.textContent).toContain('Bonapriso');
  });
});