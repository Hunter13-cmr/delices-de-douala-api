import { TestBed } from '@angular/core/testing';
import { RatingService } from './rating.service';

describe('RatingService', () => {
  let service: RatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with no ratings', () => {
    expect(service.totalRatingsCount).toBe(0);
    expect(service.globalAverageRating).toBe(0);
    expect(service.restaurantsRatedCount).toBe(0);
  });

  it('should add a rating for a restaurant', () => {
    service.addRating(1, 4);
    const ratings = service.ratings();
    expect(ratings[1]).toEqual([4]);
  });

  it('should add multiple ratings for the same restaurant', () => {
    service.addRating(1, 4);
    service.addRating(1, 5);
    const ratings = service.ratings();
    expect(ratings[1]).toEqual([4, 5]);
  });

  it('should calculate average rating correctly', () => {
    service.addRating(1, 4);
    service.addRating(1, 5);
    expect(service.getAverageRating(1)).toBe(4.5);
  });

  it('should return 0 for average rating of unrated restaurant', () => {
    expect(service.getAverageRating(99)).toBe(0);
  });

  it('should calculate global average rating', () => {
    service.addRating(1, 4);
    service.addRating(2, 3);
    service.addRating(2, 5);
    expect(service.globalAverageRating).toBe(4.0);
  });

  it('should count total ratings across all restaurants', () => {
    service.addRating(1, 4);
    service.addRating(1, 5);
    service.addRating(2, 3);
    expect(service.totalRatingsCount).toBe(3);
  });

  it('should count restaurants that have at least one rating', () => {
    service.addRating(1, 4);
    service.addRating(1, 5);
    service.addRating(2, 3);
    expect(service.restaurantsRatedCount).toBe(2);
  });
});