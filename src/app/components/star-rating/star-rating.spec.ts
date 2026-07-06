import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarRatingComponent } from './star-rating';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarRatingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('currentRating', 0);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 5 stars', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const stars = compiled.querySelectorAll('.star');
    expect(stars.length).toBe(5);
  });

  it('should display hint message when no rating', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Survolez les étoiles');
  });

  it('should display current rating when set', () => {
    fixture.componentRef.setInput('currentRating', 3);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Votre note : 3/5');
  });

  it('should fill stars up to current rating', () => {
    fixture.componentRef.setInput('currentRating', 4);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const filledStars = compiled.querySelectorAll('.star.filled');
    expect(filledStars.length).toBe(4);
  });

  it('should emit ratingChanged event on click', () => {
    const emitSpy = vi.spyOn(component.ratingChanged, 'emit');
    component.rate(4);
    expect(emitSpy).toHaveBeenCalledWith(4);
  });

  it('should show thanks message after rating', () => {
    component.rate(5);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Merci');
  });

  it('should show hover message on mouse enter', () => {
    component.hoverRating.set(3);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Bon restaurant');
  });

  it('should clear hover message on mouse leave', () => {
    component.hoverRating.set(3);
    component.hoverRating.set(0);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('Bon restaurant');
  });

  it('should have correct hover messages for each star', () => {
    const messages = [
      { rating: 1, expected: 'À éviter' },
      { rating: 2, expected: 'Peut mieux faire' },
      { rating: 3, expected: 'Bon restaurant' },
      { rating: 4, expected: 'Très bonne adresse' },
      { rating: 5, expected: 'incontournable' },
    ];

    messages.forEach(({ rating, expected }) => {
      component.hoverRating.set(rating);
      expect(component.hoverMessage()).toContain(expected);
    });
  });

  it('should clear thanks message after timeout', () => {
    vi.useFakeTimers();
    component.rate(4);
    expect(component.thanksMessage()).toBeTruthy();
    vi.advanceTimersByTime(2001);
    expect(component.thanksMessage()).toBe('');
    vi.useRealTimers();
  });
});