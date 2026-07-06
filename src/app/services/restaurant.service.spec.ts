import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RestaurantService } from './restaurant.service';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(RestaurantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch restaurants via HTTP', () => {
    const mockRestaurants = [
      { id: 1, name: 'Le Calao Doré', district: 'Akwa', specialty: 'Ndolé', image: '/test.jpg' },
    ];

    // Trigger the HTTP request
    const restaurants = service.restaurants;
    const req = httpMock.expectOne('/api/restaurants.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockRestaurants);

    expect(restaurants.value()).toEqual(mockRestaurants);
  });

  it('should find restaurant by id', () => {
    const mockRestaurants = [
      { id: 1, name: 'Le Calao Doré', district: 'Akwa', specialty: 'Ndolé', image: '/test.jpg' },
      { id: 2, name: 'Chez Madame Ngono', district: 'Bonapriso', specialty: 'Eru', image: '/test2.jpg' },
    ];

    const restaurants = service.restaurants;
    const req = httpMock.expectOne('/api/restaurants.json');
    req.flush(mockRestaurants);

    const found = service.getRestaurantById(2);
    expect(found).toBeDefined();
    expect(found?.name).toBe('Chez Madame Ngono');
  });

  it('should return undefined for non-existent restaurant id', () => {
    const mockRestaurants = [
      { id: 1, name: 'Le Calao Doré', district: 'Akwa', specialty: 'Ndolé', image: '/test.jpg' },
    ];

    const restaurants = service.restaurants;
    const req = httpMock.expectOne('/api/restaurants.json');
    req.flush(mockRestaurants);

    const found = service.getRestaurantById(99);
    expect(found).toBeUndefined();
  });
});