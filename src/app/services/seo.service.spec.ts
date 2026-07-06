import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';
import { Title, Meta } from '@angular/platform-browser';
import { Restaurant } from '../models/restaurant';

describe('SeoService', () => {
  let service: SeoService;
  let title: Title;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set default meta tags', () => {
    service.initDefaultMeta();
    expect(title.getTitle()).toBe('Délices de Douala');
    expect(meta.getTag('name="description"')?.content).toContain('Découvrez');
  });

  it('should set restaurant meta tags', () => {
    const restaurant: Restaurant = {
      id: 1,
      name: 'Le Calao Doré',
      district: 'Akwa',
      specialty: 'Ndolé aux crevettes',
      image: '/images/ndole-crevettes.jpg',
    };

    service.setRestaurantMeta(restaurant);
    expect(title.getTitle()).toBe('Le Calao Doré - Délices de Douala');
    expect(meta.getTag('name="description"')?.content).toContain('Akwa');
    expect(meta.getTag('name="description"')?.content).toContain('Ndolé');
    expect(meta.getTag('property="og:type"')?.content).toBe('restaurant');
    expect(meta.getTag('property="og:image"')?.content).toBe(
      '/images/ndole-crevettes.jpg'
    );
  });

  it('should set not found meta tags', () => {
    service.setNotFoundMeta();
    expect(title.getTitle()).toBe('Page non trouvée - Délices de Douala');
    expect(meta.getTag('name="description"')?.content).toContain(
      'n\'existe pas'
    );
  });

  it('should set geo meta tags for restaurant', () => {
    const restaurant: Restaurant = {
      id: 2,
      name: 'Chez Madame Ngono',
      district: 'Bonapriso',
      specialty: 'Eru',
      image: '/images/eru.jpg',
    };

    service.setRestaurantMeta(restaurant);
    expect(meta.getTag('name="geo.region"')?.content).toBe('CM-LT');
    expect(meta.getTag('name="geo.placename"')?.content).toBe('Bonapriso');
  });
});