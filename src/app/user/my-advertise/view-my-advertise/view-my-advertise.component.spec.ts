import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyAdvertiseComponent } from './view-my-advertise.component';

describe('ViewMyAdvertiseComponent', () => {
  let component: ViewMyAdvertiseComponent;
  let fixture: ComponentFixture<ViewMyAdvertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyAdvertiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyAdvertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
