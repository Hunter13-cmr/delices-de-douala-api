import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(MenuService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch menu via HTTP', () => {
    const mockPlats = [
      { id: 'd1', nom: 'Ndolè', prix: 3500, categorie: 'Plats', disponible: true, image: '/test.jpg', restaurantId: 1 },
    ];

    const menu = service.menu;
    const req = httpMock.expectOne('/api/plats.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockPlats);

    expect(menu.value()).toEqual(mockPlats);
  });

  it('should filter plats by restaurant id', () => {
    const mockPlats = [
      { id: 'd1', nom: 'Ndolè', prix: 3500, categorie: 'Plats', disponible: true, image: '/test.jpg', restaurantId: 1 },
      { id: 'd2', nom: 'Eru', prix: 2500, categorie: 'Plats', disponible: true, image: '/test2.jpg', restaurantId: 2 },
      { id: 'd3', nom: 'Poulet DG', prix: 4000, categorie: 'Plats', disponible: true, image: '/test3.jpg', restaurantId: 1 },
    ];

    const menu = service.menu;
    const req = httpMock.expectOne('/api/plats.json');
    req.flush(mockPlats);

    const platsResto1 = service.getPlatsByRestaurant(1);
    expect(platsResto1.length).toBe(2);
    expect(platsResto1.map(p => p.nom)).toEqual(['Ndolè', 'Poulet DG']);
  });

  it('should return empty array for restaurant with no plats', () => {
    const mockPlats = [
      { id: 'd1', nom: 'Ndolè', prix: 3500, categorie: 'Plats', disponible: true, image: '/test.jpg', restaurantId: 1 },
    ];

    const menu = service.menu;
    const req = httpMock.expectOne('/api/plats.json');
    req.flush(mockPlats);

    const platsResto99 = service.getPlatsByRestaurant(99);
    expect(platsResto99).toEqual([]);
  });

  it('should start with empty search query', () => {
    expect(service.searchQuery()).toBe('');
  });

  it('should update search query signal', () => {
    service.searchQuery.set('ndolé');
    expect(service.searchQuery()).toBe('ndolé');
  });
});