import { TestBed } from '@angular/core/testing';

import { MyAdvertiseService } from './my-advertise.service';

describe('MyAdvertiseService', () => {
  let service: MyAdvertiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAdvertiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
