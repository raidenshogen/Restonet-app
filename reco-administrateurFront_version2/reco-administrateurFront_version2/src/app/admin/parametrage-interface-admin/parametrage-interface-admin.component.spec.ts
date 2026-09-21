import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageInterfaceAdminComponent } from './parametrage-interface-admin.component';

describe('ParametrageInterfaceAdminComponent', () => {
  let component: ParametrageInterfaceAdminComponent;
  let fixture: ComponentFixture<ParametrageInterfaceAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParametrageInterfaceAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParametrageInterfaceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
