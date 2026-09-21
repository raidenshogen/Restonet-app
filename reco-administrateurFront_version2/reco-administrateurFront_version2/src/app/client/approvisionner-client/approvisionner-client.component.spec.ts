import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovisionnerClientComponent } from './approvisionner-client.component';

describe('ApprovisionnerClientComponent', () => {
  let component: ApprovisionnerClientComponent;
  let fixture: ComponentFixture<ApprovisionnerClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovisionnerClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovisionnerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
