import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageAccesAdminComponent } from './parametrage-acces-admin.component';

describe('ParametrageAccesAdminComponent', () => {
  let component: ParametrageAccesAdminComponent;
  let fixture: ComponentFixture<ParametrageAccesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParametrageAccesAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParametrageAccesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
