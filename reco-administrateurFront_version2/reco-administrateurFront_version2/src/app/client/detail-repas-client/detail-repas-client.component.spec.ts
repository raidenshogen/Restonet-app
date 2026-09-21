import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRepasClientComponent } from './detail-repas-client.component';

describe('DetailRepasClientComponent', () => {
  let component: DetailRepasClientComponent;
  let fixture: ComponentFixture<DetailRepasClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailRepasClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailRepasClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
