import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with light theme by default', () => {
    expect(service.theme()).toBe('light');
  });

  it('should toggle from light to dark', () => {
    service.toggle();
    expect(service.theme()).toBe('dark');
  });

  it('should toggle from dark to light', () => {
    service.toggle();
    service.toggle();
    expect(service.theme()).toBe('light');
  });
});