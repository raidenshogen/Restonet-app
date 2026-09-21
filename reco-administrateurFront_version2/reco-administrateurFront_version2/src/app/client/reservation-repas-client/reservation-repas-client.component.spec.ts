import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationRepasClientComponent } from './reservation-repas-client.component';

describe('ReservationRepasClientComponent', () => {
  let component: ReservationRepasClientComponent;
  let fixture: ComponentFixture<ReservationRepasClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationRepasClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationRepasClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
