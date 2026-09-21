import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovisionnementAdminComponent } from './approvisionnement-admin.component';

describe('ApprovisionnementAdminComponent', () => {
  let component: ApprovisionnementAdminComponent;
  let fixture: ComponentFixture<ApprovisionnementAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovisionnementAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovisionnementAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
