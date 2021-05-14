import { TestBed } from '@angular/core/testing';

import { MyInterestService } from './my-interest.service';

describe('MyInterestService', () => {
  let service: MyInterestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyInterestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
