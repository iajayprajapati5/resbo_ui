import { TestBed } from '@angular/core/testing';

import { MainAuthGuard } from './main-auth.guard';

describe('MainAuthGuard', () => {
  let guard: MainAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MainAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
