import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseDetailComponent } from './advertise-detail.component';

describe('AdvertiseDetailComponent', () => {
  let component: AdvertiseDetailComponent;
  let fixture: ComponentFixture<AdvertiseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
